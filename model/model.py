import pandas as pd
import os
import numpy as np


#todo export data as analytics.csv



def clean_analytics(data ,heart):

    aa = list()
    with open(data) as f:
        for line in f:
            if "?" not in line:
                aa.append(line.split(","))

    h = pd.read_csv(heart)
    l = np.array(aa)
    df = pd.DataFrame(data=l,columns=list(h))
    df = df.drop(columns='target')
    df = df.astype(dtype='float')
    target=os.path.join(os.path.split(data)[0],"analytics.csv")


    df.to_csv(target,sep=',')

    print(df.head())





#todo categorical separation
#todo export to model.csv
def clean_model(data,heart):
    pass





if __name__ == "__main__":
    data = os.path.join(os.path.split(os.getcwd())[0],"data/processed.cleveland.data")
    heart = os.path.join(os.path.split(os.getcwd())[0], "data/heart.csv")
    aa = clean_analytics(data,heart)

    clean_model(data,heart)












