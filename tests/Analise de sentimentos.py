from google.colab import drive
drive.mount('/content/drive')

import nltk
import re
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
from sklearn.model_selection import cross_val_predict

from nltk import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import svm
from sklearn import metrics
from sklearn.model_selection import cross_val_predict

df = pd.read_csv('/content/drive/MyDrive/Colab Notebooks//Tweets_Mg.csv', encoding='utf-8')

df.head()

df.Classificacao.value_counts()

df.drop_duplicates(['Text'], inplace=True)


posts = df["Text"]
posts

classes = df['Classificacao']
classes

import nltk
nltk.download('stopwords')
nltk.download('rslp')
nltk.download('punkt')
nltk.download('wordnet')


Reviews_Rappi['content'] = Reviews_Rappi.apply(lambda row: nltk.word_tokenize(row['content']), axis=1) # Tokenização dos dados

stopwords = stopwords.words(language)
stopwords = list(set(stopwords))

def remove_stopwords(words):
    """Remover as Stopwords das palavras tokenizadas"""
    new_words = []
    for word in words:
        if word not in stopwords:
            new_words.append(word)
    return new_words

def to_lowercase(words):
    """converter todos os caracteres para lowercase"""
    new_words = []
    for word in words:
        new_word = word.lower()
        new_words.append(new_word)
    return new_words



