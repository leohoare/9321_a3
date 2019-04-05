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
    #don't drop target as it is used for both
    df = df.replace(r'\\n','',regex=True)
    df = df.astype(dtype=float)
    #change if taget>0 == 1
    df['target'] = (df['target']>0).astype(float)
    target=os.path.join(os.path.split(data)[0],"analytics.csv")

    df.to_csv(target,sep=',', index= False)
    return df



def clean_model(data):

    dataset = pd.get_dummies(data, columns=['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca','thal'])
    standardScaler = StandardScaler()
    columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    dataset[columns_to_scale] = standardScaler.fit_transform(dataset[columns_to_scale])




    #hard_coding rename and arrangement

    dataset.columns = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak' ,
                       'sex_0.0', 'sex_1.0', 'cp_1.0', 'cp_2.0', 'cp_3.0',
                       'cp_4.0', 'fbs_0.0', 'fbs_1.0', 'restecg_0.0', 'restecg_1.0',
                       'restecg_2.0', 'exang_0.0', 'exang_1.0', 'slope_1.0', 'slope_2.0',
                       'slope_3.0', 'ca_0.0', 'ca_1.0', 'ca_2.0', 'ca_3.0', 'thal_3.0', 'thal_6.0',
                       'thal_7.0','target']

    print(list(dataset))

    a = os.path.join(os.path.split(os.getcwd())[0], "data/model.csv")
    dataset.to_csv(a, sep=',', index=False)
    return dataset


#extract mean and sd of the data and return pandas
def meanAndSd(data):
    stats = pd.DataFrame()
    stats["mean"] = data.mean()
    stats["Std.Dev"] = data.std()
    stats = stats.T
    stats = stats.drop(['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca','thal','target'],axis=1)

    a = os.path.join(os.path.split(os.getcwd())[0], "normalised.csv")
    stats.to_csv("./../data/normalised.csv", sep=',', index=False)



if __name__ == "__main__":
    data = os.path.join(os.path.split(os.getcwd())[0],"data/processed.cleveland.data")
    heart = os.path.join(os.path.split(os.getcwd())[0], "data/heart.csv")
    clean_data = clean_analytics(data,heart)
    clean_model(clean_data)












