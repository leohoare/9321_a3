import sys
import base64
import io
import json
import pandas as pd

# ### ADD SEABORN PLOT / MATPLOTLIB TO REQUIREMENTS IF WE WANT IT ###
import seaborn as sns
import matplotlib.pyplot as plt
# from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

from flask import Flask, abort, request, send_file, jsonify
from flask_restplus import Resource, Api, reqparse, fields
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


from model.train import logregcoeff, logreg, knn, dnn
from model.model import prediction_clean_data

AxisMapping = {
        1: "Age",
        2: "Sex (1: male; 0: female)",
        3: "chest pain type (1:typical angin, 2:atypical angina, 3:non-anginal pain, 4:asymptomatic)",
        4: "resting blood pressure",
        5: "serum cholestoral in mg/dl",
        6: "fasting blood sugar > 120 mg/dl",
        7: "resting electrocardiographic (0:normal, 1:ST-T wave abnormality, 2:left ventricular hypertrophy)",
        8: "maximum heart rate achieved",
        9: "exercise induced angina",
        10: "oldpeak = ST depression induced by exercise relative to rest",
        11: "the slope of the peak exercise ST segment",
        12: "number of major vessels (0-3) colored by flourosopy",
        13: "thal(Thalassemia): 3 = normal; 6 = fixed defect; 7 = reversable defect"
    }


"API "
app = Flask(__name__)
# to enable CORS for local development
cors = CORS(app, resources={r"*": {"origins": "*"}})
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app, title='Backend for 9321 a3', description='', default="Actions",  default_label=None)


@api.route('/getdata/<string:agesex>/<int:indicator>')
class getdata(Resource):
    @api.doc(responses={200: 'Success', 400: 'Incorrect input by user'})
    def get(self,agesex,indicator):
        if agesex.lower() == 'sex' or agesex == '1':
            agesex = 1
        elif agesex.lower() == 'age' or agesex == '2':
            agesex = 2
        else:
            abort(400, 'agesex must be in set {age,sex,1,2}')
        if indicator > 13 or indicator < 3:
            abort(400, 'indicator must be between 3 and 13')
        col1 = df.columns[agesex-1]
        col2 = df.columns[indicator-1]
        return {
            "records":
            [   
                {
                    'x' : row[col1],
                    'y' : row[col2],
                }
                for index, row in df[[df.columns[agesex-1], df.columns[indicator-1]]].iterrows()
            ]
        }, 200



@api.route('/getgraph/<string:agesex>/<int:indicator>')
class getgraph(Resource):
    @api.doc(responses={200: 'Success', 400: 'Incorrect input by user'})

    def get(self,agesex,indicator):
        if agesex.lower() == 'age' or agesex == '1':
            agesex = 1
        elif agesex.lower() == 'sex' or agesex == '2':
            agesex = 2
        else:
            abort(400, 'agesex must be in set {age,sex,1,2}')
        if indicator > 13 or indicator < 3:
            abort(400, 'indicator must be between 3 and 13')
        col1 = df.columns[agesex-1]
        col2 = df.columns[indicator-1]
        sns.set(font_scale=0.5, style="whitegrid")

        if agesex == 1: # Age
            if indicator in [3,6,7,9,11,12,13]: #Categorical data
                graph = sns.boxplot(x=df[col2], y=df[col1])
                graph.set(xlabel=AxisMapping[indicator], ylabel=AxisMapping[agesex])
            else: #Numerical data
                graph = sns.regplot(x=df[col1], y=df[col2])
                graph.set(xlabel=AxisMapping[agesex], ylabel=AxisMapping[indicator])
        else: # Sex
            if indicator in [3,6,7,9,11,12,13]:
                graph = sns.countplot(x=col1, data=df, hue=col2)
                graph.set(xlabel=AxisMapping[agesex], title="Count " + AxisMapping[indicator] )
            else:
                graph = sns.boxplot(x=df[col1], y=df[col2])
                graph.set(xlabel=AxisMapping[agesex], ylabel=AxisMapping[indicator])
        img = io.BytesIO()
        plt.savefig(img, format='png')
        plt.clf()
        img.seek(0)
        return {"bytearray" : base64.b64encode(img.getvalue()).decode()},200

@api.route('/getcoefficients/')
class getcoefficients(Resource):
    @api.doc(responses={200: 'Success'})
    def get(self):
        return logregcoeff(df_model)

@api.route('/getprediction/')
class postprediction(Resource):
    @api.doc(body=api.model("payload", {
        "modeltype":fields.String(description="modeltype",required=False),
        "age":fields.Integer(description="age",required=True),
        "sex":fields.Boolean(description="sex",required=True),
        "cp":fields.Integer(description="cp",required=True),
        "trestbps":fields.Integer(description="trestbps",required=True),
        "chol":fields.Integer(description="chol",required=True),
        "fbs":fields.Integer(description="fbs",required=True),
        "restecg":fields.Integer(description="restecg",required=True),
        "thalach":fields.Integer(description="thalach",required=True),
        "exang":fields.Boolean(description="exang",required=True),
        "oldpeak":fields.Float(description="oldpeak",required=True),
        "slope":fields.Integer(description="slope",required=True),
        "ca":fields.Integer(description="ca",required=True),
        "thal":fields.Integer(description="thal",required=True),
        }),\
    responses={200: 'Success', 400: 'Incorrect input by user'})
    def post(self):
        jsonreq = request.get_json()
        modeltype = ""
        for field in jsonreq:
            if field not in ["modeltype", "thal"]:
                if jsonreq[f"{field}"] < df[f"{field}"].min() or jsonreq[f"{field}"] > df[f"{field}"].max():
                    abort(400, f'{field} must be between { df[f"{field}"].min()} and {df[f"{field}"].max()}')
            if field == "thal":
                if jsonreq[f'{field}'] not in [3,6,7]:
                    abort(400, f'thal must be between either 3, 6 or 7')
            if field == "modeltype":
                if jsonreq["modeltype"] is not None:
                    if jsonreq["modeltype"].lower() in ["knn","dnn","logreg",""]:
                        modeltype=jsonreq["modeltype"].lower()
                    else:
                        abort(400, 'modeltype must be in [knn,dnn,logreg]')
        pred_values = pd.DataFrame.from_dict({field:[jsonreq[field]] for field in jsonreq if field != "modeltype"})
        print(pred_values)
        pred_values = prediction_clean_data(pred_values,df_norm)

        print(pred_values)
        """
        if modeltype:
            if modeltype == "knn":
                return knn(df_model),200
            elif modeltype == "dnn":
                return dnn(df_model),200
            elif modeltype == "logreg":
                return logreg(df_model),200

        return {
            "knn" : knn(df_model),
            "dnn" : dnn(df_model),
            "logreg" : logreg(df_model),
        }, 200
        """
        return "ok",200
if __name__ == '__main__':
    
    df = pd.read_csv("./data/analytics.csv")
    df_model = pd.read_csv("./data/model.csv")
    df_norm = pd.read_csv("./data/normalised.csv")
    app.run(debug=True)