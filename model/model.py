import pandas as pd
import os
import numpy as np
from sklearn.preprocessing import StandardScaler


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
    df.to_csv(target,sep=',', index= False)
    return df





#todo categorical separation
#todo export to model.csv
def clean_model(data):
    print(data.head())
    dataset = pd.get_dummies(data, columns=['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca'])
    standardScaler = StandardScaler()
    columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    dataset[columns_to_scale] = standardScaler.fit_transform(dataset[columns_to_scale])

    a = os.path.join(os.path.split(os.getcwd())[0], "data/model.csv")
    dataset.to_csv(a, sep=',', index=False)






if __name__ == "__main__":
    data = os.path.join(os.path.split(os.getcwd())[0],"data/processed.cleveland.data")
    heart = os.path.join(os.path.split(os.getcwd())[0], "data/heart.csv")
    clean_data = clean_analytics(data,heart)
    clean_model(clean_data)












