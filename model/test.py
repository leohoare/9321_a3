import train
import pandas as pd







def run_test():
    analytics = pd.read_csv("./../data/analytics.csv")
    analytics = analytics.head(1)
    y_predict = analytics['target']
    analytics = analytics.drop('target', axis=1)
    aa = train.predict_Data(analytics)

    print (y_predict[0])
    print (aa[0])


if __name__ == "__main__":
    run_test()