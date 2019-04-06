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

from model.model import clean_model
from model.model import meanAndSd
from model.model import prediction_clean_data
import matplotlib.pyplot as plt



def save_model(model , filename ):
    joblib.dump(model,filename)



def train_knn(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33,random_state=0)

    knn_scores = []
    #todo maybe try lots of range
    knn_model = KNeighborsClassifier(n_neighbors=4)
    knn_model.fit(X_train, y_train.values.ravel())
    knn_model.score(X_test, y_test)
    #save the model
    #with open("model_knn",'wb') as f:
        #pickle.dump(knn_model)
    save_model(knn_model,"knn_model.sav")


    #print(knn_scores)
#given pandas data firld return result




"""
Parameters:
            :arg Analytics : Takes Pandas data frame 
            :arg normalised_data: which is already generated so don't change unless we have new data
            :arg fil : saved model file, default is knn_model
"""


def predict_Data(analytics, normalised_data = "normalised.csv",file = "knn_model.sav"):

    normalised_data = pd.read_csv("./../data/{}".format(normalised_data))
    #splitting categorical values

    #to normalise we need to reduce the age  testbps chol thalach oldpeak
    #iteratively
    x_test = prediction_clean_data(analytics,normalised_data)

     #finally load and predict data
    model = joblib.load(file)
    result = model.predict(x_test)


    return result



def train_random_forest():
    pass

def logreg(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    lr = LogisticRegression(solver="liblinear", max_iter=100)
    lr.fit(X_train,y_train.values.ravel())
    y_pred=lr.predict(X_test)
    #print(y_pred[0])
    #print(sigmoid(0))
    
    # calculates propbability..
    # print(sigmoid(lr.intercept_[0] + sum([X_test.iloc[0][i]*lr.coef_[0][i] for i in range(len(X_test.iloc[0]))])))
    
    #print(lr.coef_, lr.intercept_)
    #print(confusion_matrix(y_test, y_pred))
    #print([i for i in range(len(X_test.iloc[0]))])
    # print( X.colums[i] for i in range(len(X.columns)))
    data = {}
    for i in range(len(X.columns)):
        data[X.columns[i]] = lr.coef_[0][i]
    data["intercept"] = lr.intercept_[0]
    return data

def sigmoid(x):
    return 1 / (1 + np.e**(-x))

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
    #print(confusion_matrix(y_test, y_pred))


def pca():
    pass


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




if __name__=="__main__":
    # like os method, assumes file is run from file location #
    model = pd.read_csv("./../data/model.csv")
    train_knn(model)
    # dnn(model)
    print(logreg(model))
    #logreg(model)
    ## all testing after this one
    #print (analytics)
    #normalise new data
    #dnn(model, 2)

