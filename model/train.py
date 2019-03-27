import tensorflow as tf
import numpy as np
import pandas as pd
import os


def train_knn():
    pass

def train_random_forest():
    pass

def logistic_regression():
    pass

def pca():
    pass





if __name__=="__main__":
    model = os.path.join(os.path.split(os.getcwd())[0], "data/model.csv")
    analytics = os.path.join(os.path.split(os.getcwd())[0], "data/analytics.csv")
    model = pd.read_csv(model)
    analytics = pd.read_csv(analytics)

    print(model.head())
    print(analytics.head())