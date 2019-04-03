import os
import csv
import re
# import StringIO
import base64
import io
import pandas as pd
# ### ADD SEABORN PLOT / MATPLOTLIB TO REQUIREMENTS IF WE WANT IT ###
import seaborn as sns
import matplotlib.pyplot as plt
# from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

from flask import Flask, abort, request, send_file, jsonify
from flask_restplus import Resource, Api, reqparse, fields
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# def create_db(db_file):
#     ''' Create db file in working directory '''
#     global db, Entry
#     basedir = os.path.abspath(os.path.dirname(__file__))
#     app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///' + os.path.join(basedir,'../data/', db_file)
#     db = SQLAlchemy(app)

#     # age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal,target
#     # nullable for now
#     class Entry(db.Model):
#         id = db.Column(db.Integer, primary_key=True)
#         age = db.Column(db.Integer, nullable=False)
#         sex = db.Column(db.Boolean, nullable=False)
#         cp = db.Column(db.Integer, nullable=False)       
#         restbp = db.Column(db.Integer, nullable=False)
#         chol = db.Column(db.Integer, nullable=False)
#         fbs = db.Column(db.Boolean, nullable=False)
#         restecg = db.Column(db.Integer, nullable=False)
#         maxhr = db.Column(db.Integer, nullable=False)
#         exang = db.Column(db.Boolean, nullable=False)
#         oldpeak = db.Column(db.Float(4,4), nullable=False)
#         slope = db.Column(db.Integer, nullable=False)
#         numves = db.Column(db.Integer, nullable=False)
#         thal = db.Column (db.Integer, nullable=False)
#         # target = db.Column (db.Integer, nullable=True)

#     db.create_all()
#     return db

# def populate_db(file_path):
#     global db, Entry
#     with open(file_path) as csv_file:
#         csv_reader = csv.reader(csv_file, delimiter=',')
#         for row in csv_reader:
#             try:
#                 db.session.add(Entry(\
#                 age = row[0], \
#                 sex = bool(row[1]), \
#                 cp = row[2], \
#                 restbp = row[3], \
#                 chol = row[4], \
#                 fbs = bool(row[5]), \
#                 restecg = row[6], \
#                 maxhr = row[7], \
#                 exang = bool(row[8]), \
#                 oldpeak = row[9], \
#                 slope = row[10], \
#                 numves = row[11], \
#                 thal = row[12], \
#                     ))
#             except Exception as ex:
#                 print(ex) 
#     db.session.commit()

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
class DataAcesss(Resource):
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
class DataAcesss(Resource):
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

if __name__ == '__main__':
    # create_db('data.db')
    # populate_db('../data/processed.cleveland.data')
    df = pd.read_csv("./../data/analytics.csv")
    app.run(debug=True)