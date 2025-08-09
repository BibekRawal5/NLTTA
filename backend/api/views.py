from django.shortcuts import render
# Create your views here.
import traceback
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from .models import Feed, FeedItem, Translate, BM25
from .serializers import FeedSerializer, FeedItemSerializer, TranslateSerializer

from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import re
import torch

tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
model = MBartForConditionalGeneration.from_pretrained("./checkpoint-17000")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

tokenizer.src_lang = "ne_XX"
tokenizer.tgt_lang = "en_XX"

queryset = FeedItem.objects.all().order_by('-published_at')

corpus = [
            item.title + " " + item.content if item.is_translated == 'no' else item.translated_content
            for item in queryset
        ]
bm25 = BM25(corpus)


class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

class FeedItemViewSet(viewsets.ModelViewSet):
    queryset = FeedItem.objects.all().order_by('-published_at')
    serializer_class = FeedItemSerializer
    
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        roman_query = request.query_params.get('q', '')
        if not roman_query:
            return Response({'error': 'Missing query text'}, status=400)

        # Load articles
        feed_items = self.get_queryset()
      
        # Step 2: Translate the query using Translation table (BM25)
        factory = APIRequestFactory()
        fake_post = factory.post('/api/translate/', {'source_text': roman_query}, format='json')
        translate_view = TranslateViewSet.as_view({'post': 'create'})
        translate_response = translate_view(fake_post)
        print(translate_response)
        translated_query = translate_response.data.get('translated_text', roman_query)
        print(translated_query)
        
        # Step 3: BM25 with translated English query
        top_docs = bm25.rank(translated_query, 5)

        # Step 4: Return top results
        top_indxs = []
        for idx, score in top_docs:
            print("Index: ", idx, "  Score: ", score)
            print("Title: ", feed_items[idx].title)
            print("link: ", feed_items[idx].link)
            if(feed_items[idx].translated_content):
                print("link: ", feed_items[idx].translated_content[:200])
            print()
            top_indxs.append(idx)
            
        top_articles = [feed_items[i] for i in top_indxs]
        serializer = self.get_serializer(top_articles, many=True)

        return Response({
            "original_query": roman_query,
            "translated_query": translated_query,
            "results": serializer.data
        })       

class TranslateViewSet(viewsets.ModelViewSet):
    queryset = Translate.objects.all().order_by('-created_at')
    serializer_class = TranslateSerializer
 
    def pre_process(self, text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()  
        
        return text
    
    def remove_word_prefixes(self, text, prefixes):
        pattern = r'^(' + '|'.join(re.escape(p) for p in prefixes) + r')\b\s*'
        return re.sub(pattern, '', text)

    def create(self, request, *args, **kwargs):
        try:
            source_text = request.data.get('source_text')
            if not source_text:
                return Response({"error": "source_text is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Translate
            text = source_text
            inputs = tokenizer(self.pre_process(text), return_tensors="pt")
            generated = model.generate(
                **inputs,
                forced_bos_token_id=tokenizer.lang_code_to_id["en_XX"],
                max_length=128,
                num_beams=5
            )

            translated_text = self.remove_word_prefixes(str(tokenizer.decode(generated[0], skip_special_tokens=True)), ['e', 'ne'])

            # Save to DB
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(translated_text=translated_text)
    
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            return Response({
                "error": str(e),
                "trace": traceback.format_exc()
            }, status=500)
    

            
