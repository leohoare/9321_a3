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



def clean_model(data):

    dataset = pd.get_dummies(data, columns=['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca'])
    standardScaler = StandardScaler()
    columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    dataset[columns_to_scale] = standardScaler.fit_transform(dataset[columns_to_scale])

    #renaming columns

    dataset.rename( columns={"sex_0.0": "sex_female", "sex_1.0": "sex_male"})
    #hard_coding renamde
    dataset.columns = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak', 'thal', 'sex_female', 'sex_male', 'cp_typical_anign', 'cp_atypical_angina', 'cp_non_anginal_pain',
     'cp_asymptomatic', 'fbs_<120', 'fbs_>120', 'restecg_normal', 'restecg_having_st_t', 'restecg_probable_ventricular_hypothropy', 'exang_0.0', 'exang_1.0', 'slope_1.0',
     'slope_2.0', 'slope_3.0', 'ca_0.0', 'ca_1.0', 'ca_2.0', 'ca_3.0']

    #thalch to end position
    dataset = dataset[['age', 'trestbps', 'chol', 'oldpeak', 'thalach', 'sex_female', 'sex_male', 'cp_typical_anign', 'cp_atypical_angina', 'cp_non_anginal_pain',
     'cp_asymptomatic', 'fbs_<120', 'fbs_>120', 'restecg_normal', 'restecg_having_st_t', 'restecg_probable_ventricular_hypothropy', 'exang_0.0', 'exang_1.0', 'slope_1.0',
     'slope_2.0', 'slope_3.0', 'ca_0.0', 'ca_1.0', 'ca_2.0', 'ca_3.0','thal']]

    a = os.path.join(os.path.split(os.getcwd())[0], "data/model.csv")
    dataset.to_csv(a, sep=',', index=False)


if __name__ == "__main__":
    data = os.path.join(os.path.split(os.getcwd())[0],"data/processed.cleveland.data")
    heart = os.path.join(os.path.split(os.getcwd())[0], "data/heart.csv")
    clean_data = clean_analytics(data,heart)
    clean_model(clean_data)












