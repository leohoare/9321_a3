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



def clean_model_manual_normalisation(data,normalised_data):

    dataset = pd.get_dummies(data, columns=['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal'])
    standardScaler = StandardScaler()

    columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']

    dataset[columns_to_scale] = standardScaler.fit_transform(dataset[columns_to_scale])

    # hard_coding rename and arrangement

    dataset.columns = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak',
                       'sex_0.0', 'sex_1.0', 'cp_1.0', 'cp_2.0', 'cp_3.0',
                       'cp_4.0', 'fbs_0.0', 'fbs_1.0', 'restecg_0.0', 'restecg_1.0',
                       'restecg_2.0', 'exang_0.0', 'exang_1.0', 'slope_1.0', 'slope_2.0',
                       'slope_3.0', 'ca_0.0', 'ca_1.0', 'ca_2.0', 'ca_3.0', 'thal_3.0', 'thal_6.0',
                       'thal_7.0', 'target']

    print(list(dataset))




# if __name__=="__main__":
#     # like os method, assumes file is run from file location #
#     model = pd.read_csv("./../data/model.csv")
#     print(train_knn(model))
#     # dnn(model)
#     # print(logreg(model))
#     #logreg(model)
#     ## all testing after this one
#     #print (analytics)
#     #normalise new data
#     #dnn(model, 2)

