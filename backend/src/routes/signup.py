# backend/src/routes/signup.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import bcrypt
from dataBase import get_db
import jwt

signup = Blueprint('signup', __name__)
loginCollection, contextoCollection, userGuessCollection = get_db()
SECRET_KEY = "your_secret_key"  # Ensure this matches your actual secret key

@signup.route('/signup', methods=['POST'])
def userSignup():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    passwordConfirmation = data.get('password')

    if passwordConfirmation != password:
        return jsonify({"error": "Passwords do not match"}), 400
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    if loginCollection.find_one({'username': username}):
        return jsonify({"error": "Username already exists"}), 409

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {"username": username, "password": hashed_password.decode('utf-8')}
    result = loginCollection.insert_one(user)
    user_id = str(result.inserted_id)
    
    access_token = jwt.encode({'username': username}, SECRET_KEY)

    return jsonify({"message": "User created successfully", "user_id": user_id, "access_token": access_token}), 201
