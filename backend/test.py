import seaborn as sns
import pandas as pd
df = pd.read_csv("./../data/analytics.csv")

sns.regplot(x=df["age"], y=df["chol"])