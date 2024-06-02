# backend/src/routes/login.py

from flask import Blueprint, request, jsonify
from datetime import datetime
from gensim.models import KeyedVectors
import random
import json
from bson.json_util import dumps
from dataBase import get_db
import bcrypt
import jwt
import datetime

SECRET_KEY = "your_secret_key"  # Replace with a secure key

loginCollection, contextoCollection, userGuessCollection = get_db()  # Obtain both database and collection objects

login = Blueprint('login', __name__)

@login.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    username = data['username']

    # firstname = data['firstname']
    # lastname = data['email']
    # email = data['email']

    password = data['password']

    if loginCollection.find_one({"username": username}):
        return jsonify({'message': 'Username already exists'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    loginCollection.insert_one({'username': username, 'password': hashed_password.decode('utf-8')})
    
    return jsonify({'message': 'User created successfully'}), 201

@login.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = loginCollection.find_one({"username": username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY)
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid username or password'}), 401

def token_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except:
            return jsonify({'message': 'Invalid token!'}), 403

        return f(*args, **kwargs)
    return wrapper
