import os
import csv
from flask import Flask, abort, request
from flask_restplus import Resource, Api, reqparse, fields
from flask_sqlalchemy import SQLAlchemy


def create_db(db_file):
    ''' Create db file in working directory '''
    global db, Entry
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///' + os.path.join(basedir,'../data/', db_file)
    db = SQLAlchemy(app)

    # age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal,target
    # nullable for now
    class Entry(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        age = db.Column(db.Integer, nullable=True)
        sex = db.Column(db.Boolean, nullable=True)
        cp = db.Column(db.Integer, nullable=True)       
        restbp = db.Column(db.Integer, nullable=True)
        chol = db.Column(db.Integer, nullable=True)
        fbs = db.Column(db.Boolean, nullable=True)
        restecg = db.Column(db.Integer, nullable=True)
        maxhr = db.Column(db.Integer, nullable=True)
        exang = db.Column(db.Boolean, nullable=True)
        oldpeak = db.Column(db.Float(4,4), nullable=True)
        slope = db.Column(db.Integer, nullable=True)
        numves = db.Column(db.Integer, nullable=True)
        thal = db.Column (db.Integer, nullable=True)
        # target = db.Column (db.Integer, nullable=True)

    db.create_all()
    return db

def populate_db(file_path):
    global db, Entry
    with open(file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            db.session.add(Entry(\
                age = row[0], \
                sex = bool(row[1]), \
                cp = row[2], \
                restbp = row[3], \
                chol = row[4], \
                fbs = bool(row[5]), \
                restecg = row[6], \
                maxhr = row[7], \
                exang = bool(row[8]), \
                oldpeak = row[9], \
                slope = row[10], \
                numves = row[11], \
                thal = row[12], \
                ))
    db.session.commit()

"API "
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app, title='Backend for 9321 a3', description='', default="Actions",  default_label=None)
    

@api.route('/test')
class VisualiseGraph(Resource):
    # @api.doc(body=api.model("payload", {"indicator_id":fields.String(description="indicator_Id",required=True)}),\
    #     responses={200: 'Success', 400: 'Incorrect input by user'})
    def post(self):
        return 200

if __name__ == '__main__':
    create_db('data.db')
    populate_db('../data/processed.cleveland.data')
    app.run(debug=True)