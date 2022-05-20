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

import nltk
nltk.download('stopwords')
nltk.download('rslp')
nltk.download('punkt')
nltk.download('wordnet')

df = pd.read_csv('/content/drive/MyDrive/Colab Notebooks//Tweets_Mg.csv', encoding='utf-8')

df.head()

df.Classificacao.value_counts()

df.drop_duplicates(['Text'], inplace=True)


posts = df["Text"]
posts

classes = df['Classificacao']
classes

"""Remove pontuação gráfica"""

def RemoveStopWords(instancia):
    stopwords = set(nltk.corpus.stopwords.words('portuguese'))
    palavras = [i for i in instancia.split() if not i in stopwords]
    return (" ".join(palavras))

"""Remove link, ;, -, ("""

def Limpeza_dados(instancia):
    instancia = re.sub(r"http\S+", "", instancia).lower().replace('.','').replace(';','').replace('-','').replace(':','').replace(')','')
    return (instancia)

from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()

def Lemmatization(instancia):
  palavras = []
  for w in instancia.split():
    palavras.append(wordnet_lemmatizer.lemmatize(w))
  return (" ".join(palavras))

def Preprocessing(instancia):
    instancia = re.sub(r"http\S+", "", instancia).lower().replace('.','').replace(';','').replace('-','').replace(':','').replace(')','')
    stopwords = set(nltk.corpus.stopwords.words('portuguese'))


# Aplica a função em todos os dados:
post = [Preprocessing(i) for i in post]

from nltk.tokenize import word_tokenize
from nltk.tokenize import TweetTokenizer

tweet_tokenizer = TweetTokenizer()

vectorizer = CountVectorizer(analyzer="word", tokenizer=tweet_tokenizer.tokenize)

freq_post = vectorizer.fit_transform(post)
type(freq_post)





