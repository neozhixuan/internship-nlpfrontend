# NLP Pipeline for Multi-Document Search

## Introduction
This repo aims to utilise different feature engineering techniques to maximise the accuracy of obtaining the most relevant documents in a corpus in relation to a query given by the user. This is done in the backend (private repository).

## Pipeline
![image](https://github.com/neozhixuan/internship-nlpfrontend/assets/79783660/2ce7cc19-6e85-42c6-9868-82a1b1a630c8)

The model firstly pre-processes both the query as well as the documents into bag-of-words, using scikitlearn tools.

It then finds the cosine similarity using 2 feature engineering algorithms (LSI and TF-IDF) and are weighed (evenly atm) to form a combined cosine similarity score.

Afterwards, it attempts to implement pointwise ranking to rank the scores based on historic data to give a set of best solutions.

## To-dos
- Find the best weights for cosine similarity of TF-IDF and LSI algorithms
- Do more pre-processing for the user's query
- Use natural language to shape the sentence answers to answer the query

## Credits
- Practical Natural Language Processing - Sowmya Vajjala et. al (O'Reilly Publications)
