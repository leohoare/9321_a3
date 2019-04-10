from model import prediction_clean_data
from train import knn
from train import train_random_forest
from train import graph_random_forest
import pandas as pd


"""
testing randdom forest 
"""




def run_test():
    analytics = pd.read_csv("./../data/analytics.csv")
    analytics = analytics.head(1)
    y_predict = analytics['target']
    analytics = analytics.drop('target', axis=1)
    df_norm = pd.read_csv("./../data/normalised.csv")
    df_model = pd.read_csv("./../data/model.csv")
    analytics = prediction_clean_data(analytics, df_norm)
    knn_a = knn(df_model,analytics)

    random = train_random_forest(df_model,analytics)


    print(graph_random_forest(df_model))



if __name__ == "__main__":
    run_test()