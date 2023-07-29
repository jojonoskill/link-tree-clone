from flask import Flask, redirect, render_template
import firebase_admin
from firebase_admin import db
import os

cred_obj = firebase_admin.credentials.Certificate('./ServiceAccountKey.json')
default_app = firebase_admin.initialize_app(cred_obj,  {
	'databaseURL': 'https://link-tree-clone-f58ef-default-rtdb.europe-west1.firebasedatabase.app/'
	})

app = Flask(__name__, static_folder='../link-tree-client/build', static_url_path='/')

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

@app.route('/home')
def index():
    return app.send_static_file('index.html')

# @app.route('/dashboard/<path:username>')
# def index():
#     return app.send_static_file('index.html')
#
# @app.route('/login')
# def index():
#     return app.send_static_file('index.html')



@app.route('/<path:username>/<path:number>', methods=['GET'])
def fetch_from_firebase(username, number):
    ref = db.reference('/'+username+"/links/"+ number)
    data = ref.get()
    if not data:
        return '404 not found'
    else:
        longURL = data['link']
        return redirect(longURL)
