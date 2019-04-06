import tensorflow as tf
import numpy as np
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

from sklearn.linear_model import LogisticRegression

from sklearn.neighbors import KNeighborsClassifier
from sklearn.externals import joblib
import pickle

# WHEN RUNNING MODEL
# from model import clean_model
# from model import meanAndSd
# from model import prediction_clean_data
# WHEN RUNNING BE
from model.model import clean_model
from model.model import meanAndSd
from model.model import prediction_clean_data
import matplotlib.pyplot as plt


def pca():
    pass
def train_random_forest():
    pass



def knn(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    knn_model = KNeighborsClassifier(n_neighbors=4)
    knn_model.fit(X_train, y_train.values.ravel())
    y_pred=knn_model.predict(X_test)
    matrix=confusion_matrix(y_test, y_pred)
    return {
        "accuracy": float((matrix[0][0]+matrix[1][1])/(sum(matrix[0])+sum(matrix[1]))),
        "no_correct" : int(matrix[0][0]),
        "no_incorrect" : int(matrix[0][1]),
        "yes_correct" : int(matrix[1][1]),
        "yes_incorrect" : int(matrix[1][0]),
    }

def logreg(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    lr = LogisticRegression(solver="liblinear", max_iter=100)
    lr.fit(X_train,y_train.values.ravel())
    y_pred=lr.predict(X_test)
    matrix=confusion_matrix(y_test, y_pred)
    return {
        "accuracy": float((matrix[0][0]+matrix[1][1])/(sum(matrix[0])+sum(matrix[1]))),
        "no_correct" : int(matrix[0][0]),
        "no_incorrect" : int(matrix[0][1]),
        "yes_correct" : int(matrix[1][1]),
        "yes_incorrect" : int(matrix[1][0]),
    }

def logregcoeff(data):
    X, y = np.split(data, [-1], axis=1)
    lr = LogisticRegression(solver="liblinear", max_iter=100)
    lr.fit(X,y.values.ravel())
    data = {}
    for i in range(len(X.columns)):
        data[X.columns[i]] = lr.coef_[0][i]
    data["intercept"] = lr.intercept_[0]
    return data

def dnn(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    classifier = Sequential()
    classifier.add(Dense(20, activation='relu', kernel_initializer="random_normal",input_dim=len(X.columns)))
    classifier.add(Dense(10, activation='relu', kernel_initializer="random_normal"))
    classifier.add(Dense(1, activation='sigmoid', kernel_initializer="random_normal"))
    classifier.compile(optimizer ='adam',loss='binary_crossentropy', metrics =['accuracy'])
    classifier.fit(X_train,y_train, batch_size=10, epochs=50)
    y_pred=(classifier.predict(X_test) > 0.5)
    matrix=confusion_matrix(y_test, y_pred)
    return {
        "accuracy": float((matrix[0][0]+matrix[1][1])/(sum(matrix[0])+sum(matrix[1]))),
        "no_correct" : int(matrix[0][0]),
        "no_incorrect" : int(matrix[0][1]),
        "yes_correct" : int(matrix[1][1]),
        "yes_incorrect" : int(matrix[1][0]),
    }
