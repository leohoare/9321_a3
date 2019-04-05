import tensorflow as tf
import numpy as np
import pandas as pd
#from keras.models import Sequential
#from keras.layers import Dense
##
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

from sklearn.linear_model import LogisticRegression

from sklearn.neighbors import KNeighborsClassifier
from sklearn.externals import joblib
import pickle

from model import clean_model
from model import meanAndSd
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



def predict_Data(analytics, normalised_data = "normalised.csv",file = "knn_model.sav"):

    normalised_data = pd.read_csv("./../data/{}".format(normalised_data))
    #splitting categorical values
    columns_to_normalise = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    n_column  = analytics[columns_to_normalise]
    analytics = analytics.drop(columns_to_normalise,axis =1)
    categorical_data = analytics
    #to normalise we need to reduce the age  testbps chol thalach oldpeak
    #iteratively
    for i in n_column:
        if i in normalised_data:
            n_column[i][0] = (n_column[i][0]-normalised_data[i][0])/normalised_data[i][1]
    #normalised of continues values done
    #print(categorical_data)
    c_dataset = pd.get_dummies(categorical_data, columns=['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal'])
    ##hacky way
    prediction_data = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak',
                       'sex_0.0', 'sex_1.0', 'cp_1.0', 'cp_2.0', 'cp_3.0',
                       'cp_4.0', 'fbs_0.0', 'fbs_1.0', 'restecg_0.0', 'restecg_1.0',
                       'restecg_2.0', 'exang_0.0', 'exang_1.0', 'slope_1.0', 'slope_2.0',
                       'slope_3.0', 'ca_0.0', 'ca_1.0', 'ca_2.0', 'ca_3.0', 'thal_3.0', 'thal_6.0',
                       'thal_7.0']
    predict_final_data = pd.DataFrame(0.0 , index= np.arange(len(prediction_data)),columns =prediction_data)
    predict_final_data = predict_final_data.head(1)

    #copying data frame values
    for i in n_column:
        if i in predict_final_data:
            predict_final_data[i][0] = n_column[i][0]
    for i in c_dataset:
        if i in predict_final_data:
            predict_final_data[i][0] = c_dataset[i][0]

     #finally load and predict data
    model = joblib.load(file)
    result = model.predict(predict_final_data)


    return result




def train_random_forest():
    pass

def logreg(data):
    X, y = np.split(data, [-1], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.8)
    lr = LogisticRegression(solver="liblinear", max_iter=100)
    lr.fit(X_train,y_train.values.ravel())
    y_pred=lr.predict(X_test)
    #print(lr.coef_, lr.intercept_)
    #print(confusion_matrix(y_test, y_pred))

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
    # analytics only used in visualisation?
    #analytics = pd.read_csv("./../data/analytics.csv")
    # dnn(model)
    #logreg(model)
    ## all testing after this one
    analytics = pd.read_csv("./../data/analytics.csv")

    """
    This is all for testing the function and not actual use for us 
    """
    #manual mean and sd transformation
    analytics = analytics.head(1)

    y_predict = analytics['target']

    analytics = analytics.drop('target',axis = 1)


    predict_Data(analytics)
    """
    testing done
    """
    #analytics = clean_model(analytics)
    #print (analytics)

    #normalise new data
    #dnn(model, 2)

