# NLTTA — Nepali Language Transliteration and Translation Automation

NLTTA explores how to make Nepali information easier to access when people type in Romanized Nepali.

The project works with **Romanized Nepali, Devanagari Nepali, and English**. It combines a fine-tuned **mBART** model with a news-search application, connecting language processing to a practical retrieval task.

Developed as a three-person final-year B.Sc. CSIT project at **Bhaktapur Multiple Campus, Tribhuvan University**.

[Read the case study](https://bibekrawal.com.np/projects/nltta) · [Project report](https://bibekrawal.com.np/assets/docs/NLTTA.pdf)

## The problem

Romanized Nepali does not have one consistent spelling system. Different people can type the same word or sound in several ways, making exact keyword matching unreliable.

NLTTA investigates this language gap through transliteration, translation, and a news-retrieval application.

- **Transliteration** changes the script while preserving the language.
- **Translation** expresses the meaning in another language.

For example:

**namaste ↔ नमस्ते ↔ Hello**

The first connection is transliteration; the second is translation.

## How it works

The application connects a language model to a separate retrieval stage:

1. Accept a user query.
2. Process the query through the fine-tuned language model.
3. Use the resulting query to search news articles with BM25.
4. Present ranked results through a web interface.

Separating language processing from retrieval makes the pipeline easier to inspect. It also means errors in the language stage can affect the final search results.

## Dataset

The project report describes approximately **40,000 aligned samples** containing:

- Devanagari Nepali
- Romanized Nepali
- English

Data preparation used Wikipedia-derived text, open datasets, and rule-based Romanization.

The reported split was:

| Split | Proportion |
|---|---:|
| Training | 70% |
| Validation | 20% |
| Test | 10% |

Rule-generated Romanization provides useful training data, but does not capture every spelling variation found in everyday messages.

## Technology

| Component | Technology |
|---|---|
| Language model | Fine-tuned mBART |
| Model development | PyTorch |
| Backend | Django REST |
| Frontend | Next.js |
| Database | MySQL |
| News retrieval | Custom BM25 implementation |

## Reported evaluation

| Metric | Result | Evaluation context |
|---|---:|---|
| BLEU | 39.84 | Held-out 10% translation test split |
| BERTScore F1 | 0.9613 | Separate evaluation using randomly selected and generated examples |

These results come from **separately described evaluation setups** and should not be treated as measurements on an identical test set.

Translation quality and news-retrieval relevance are also different questions. A strong translation score alone does not establish how useful the retrieved articles are.

## What made this challenging

The central challenge was handling the many ways people write Romanized Nepali.

A transliteration rule can be consistent while a user's input is not. This makes naturally occurring spelling variants, informal expressions, and mixed-language queries important evaluation cases.

## Limitations and next steps

- Expand evaluation with real Romanized Nepali queries.
- Measure retrieval relevance separately from translation quality.
- Publish a versioned evaluation set and reproducible metric configuration.
- Improve coverage of informal spelling, regional expressions, and mixed-language input.
- Test queries for which the system should return no relevant result.

This repository represents an academic project and its implementation. The reported results do not establish production reliability across all Nepali language use.

## Team

- Bibek Rawal
- Prabesh Gautam
- Rahul Koju

**Supervisor:** Sushant Paudel

## More information

The [project report](https://bibekrawal.com.np/assets/docs/NLTTA.pdf) documents the methodology, architecture, experiments, and application examples.

The [case study](https://bibekrawal.com.np/projects/nltta) provides a shorter walkthrough with screenshots and discussion of the engineering tradeoffs.
