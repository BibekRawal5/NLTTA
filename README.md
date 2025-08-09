# NLTTA : Nepali Language Transliteration and Translation Automation

This project presents a complete pipeline for translating Romanized Nepali queries into 
English and retrieving the most relevant news articles using a fine-tuned mBART model called 
NLTTA and BM25 retrieval algorithm. We fine-tuned the multilingual mBART model on a 
parallel corpus of Romanized Nepali and English sentences to enhance its translation accuracy 
for Romanized (transliterated) languages, low-resource language input. The fine-tuned model 
is deployed via a Django-based REST API, which serves translation functionality in real time. 
Once a Romanized Nepali query is translated into English, the system applies the BM25 
ranking algorithm on a pre-indexed English news database to retrieve and rank the most 
relevant articles based on the query. This hybrid system bridges the linguistic gap for 
Romanized Nepali speakers, enabling effective English news search and information access 
through a robust combination of neural translation and probabilistic information retrieval. 
