# backend/src/routes/login.py

from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import bcrypt
from dataBase import get_db
import jwt

SECRET_KEY = "your_secret_key"  # Replace with a secure key

login = Blueprint('login', __name__)
loginCollection, contextoCollection, userGuessCollection = get_db()  # Obtain both database and collection objects

@login.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = loginCollection.find_one({"username": username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(hours=1)}, SECRET_KEY, algorithm='HS256')
        return jsonify({'user_id': str(user['_id']), 'token': token})  # Ensure user_id is returned as a string
    
    return jsonify({'message': 'Invalid username or password'}), 401

def token_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 403

        return f(*args, **kwargs)
    return wrapper
