import os
from flask import Flask, abort, request
from flask_restplus import Resource, Api, reqparse, fields
from flask_sqlalchemy import SQLAlchemy

def create_db(db_file):
    ''' Create db file in working directory '''
    global Entry
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///' + os.path.join(basedir,'../data/', db_file)
    db = SQLAlchemy(app)

    class Entry(db.Model):
        id = db.Column(db.Integer, primary_key=True)
    
    db.create_all()
    return db

if __name__ == '__main__':
    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    api = Api(app, title='API for COMP9321 a2', description='By Leo Hoare z5171844', default="Actions",  default_label=None)
    create_db('data.db')