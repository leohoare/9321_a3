import tensorflow as tf
import numpy as np
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.linear_model import LogisticRegression

def train_knn():
    pass

def train_random_forest():
    pass

def logreg(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.8)
    lr = LogisticRegression(solver="liblinear", max_iter=100)
    lr.fit(X_train,y_train.values.ravel())
    y_pred=lr.predict(X_test)
    print(lr.coef_, lr.intercept_)
    print(confusion_matrix(y_test, y_pred))

def dnn(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.8)
    classifier = Sequential()
    classifier.add(Dense(20, activation='relu', kernel_initializer="random_normal",input_dim=len(X.columns)))
    classifier.add(Dense(10, activation='relu', kernel_initializer="random_normal"))
    classifier.add(Dense(1, activation='sigmoid', kernel_initializer="random_normal"))
    classifier.compile(optimizer ='adam',loss='binary_crossentropy', metrics =['accuracy'])
    classifier.fit(X_train,y_train, batch_size=10, epochs=100)
    y_pred=(classifier.predict(X_test) > 0.5)
    print(confusion_matrix(y_test, y_pred))

def pca():
    pass

if __name__=="__main__":
    # like os method, assumes file is run from file location #
    model = pd.read_csv("./../data/model.csv")

    # analytics only used in visualisation?
    #analytics = pd.read_csv("./../data/analytics.csv")
    
    # dnn(model)
    logreg(model)