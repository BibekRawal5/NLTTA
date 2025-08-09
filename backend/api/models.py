from django.db import models
import math
from collections import Counter, defaultdict
import re
import torch
from bs4 import BeautifulSoup
import nltk
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize

nltk.download('punkt_tab')
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_eng')

stop_words = set(stopwords.words('english'))

# Create your models here.

class BM25:
    def __init__(self, corpus, k1=1.5, b=0.75):
        self.lemmatizer = WordNetLemmatizer()
        corpus = [self.pre_process(doc) for doc in corpus]
        self.k1 = k1
        self.b = b
        self.corpus = [self.tokenize(doc) for doc in corpus]
        self.doc_lens = [len(doc) for doc in self.corpus]
        self.avgdl = sum(self.doc_lens) / len(self.doc_lens)
        self.df = self.compute_doc_freqs()
        self.idf = self.compute_idf()

    def get_wordnet_pos(self, tag):
        if tag.startswith('J'):
            return wordnet.ADJ
        elif tag.startswith('V'):
            return wordnet.VERB
        elif tag.startswith('N'):
            return wordnet.NOUN
        elif tag.startswith('R'):
            return wordnet.ADV
        else:
            return wordnet.NOUN

    def lemmatize(self, text):
        tokens = word_tokenize(text)
        tagged = pos_tag(tokens)
        lemmatized = [
            self.lemmatizer.lemmatize(word, self.get_wordnet_pos(tag))
            for word, tag in tagged
        ]
        return ' '.join(lemmatized)
    
    def remove_html(self, text):
        soup = BeautifulSoup(text, "html.parser")
        return soup.get_text(separator=' ', strip=True)
    
    def stop_word_removal(self, text):
        filtered = [word for word in text.split() if word not in stop_words]
        return ' '.join(filtered)   

    def pre_process(self, text):
        text = self.remove_html(text)
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()  
        text = self.stop_word_removal(text)
        text = self.lemmatize(text)
        return text
    
    def tokenize(self, text):
        return text.lower().split()

    def compute_doc_freqs(self):
        df = defaultdict(int)
        for doc in self.corpus:
            for term in set(doc):
                df[term] += 1
        return df

    def compute_idf(self):
        idf = {}
        N = len(self.corpus)
        for term, freq in self.df.items():
            idf[term] = math.log(1 + (N - freq + 0.5) / (freq + 0.5))
        return idf

    def score(self, query, index):
        doc = self.corpus[index]
        doc_len = self.doc_lens[index]
        tf = Counter(doc)
        score = 0.0
        for term in self.tokenize(self.pre_process(query)):
            if term in tf:
                term_freq = tf[term]
                term_idf = self.idf.get(term, 0)
                denom = term_freq + self.k1 * (1 - self.b + self.b * doc_len / self.avgdl)
                score += term_idf * (term_freq * (self.k1 + 1)) / denom
        return score

    def rank(self, query, top_k=5):
        scores = [(i, self.score(query, i)) for i in range(len(self.corpus))]
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k] if top_k else scores

class Feed(models.Model):
    language = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    name_nepali = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=255)
    website = models.URLField()
    logo_url = models.URLField()

    def __str__(self):
        return self.name # prints name if obj is printed


class FeedItem(models.Model):
    uuid = models.CharField(max_length=36, unique=True)
    slug = models.SlugField(unique=True, max_length=255)
    link = models.URLField()
    title = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField()
    image_url = models.URLField()
    
    is_translated = models.CharField(max_length=10, default='no')
    translated_content = models.TextField(null=True)
    
    published_at = models.DateTimeField()
    published_raw_nepali_date = models.CharField(max_length=50)
    fetched_at = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True)

    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='items')

    def __str__(self):
        return self.title

class Translate(models.Model):
    source_text = models.TextField()
    translated_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
