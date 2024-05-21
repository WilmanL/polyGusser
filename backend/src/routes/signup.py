from flask import Blueprint, request, jsonify
from datetime import datetime
from gensim.models import KeyedVectors
import random
import json
from bson.json_util import dumps
import bcrypt
from dataBase import get_db
loginCollection = get_db()

signup = Blueprint('signup', __name__)

@signup.route('/polyguesser/signup', methods=['POST'])
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
    
    else:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create the user document
        user = {
            "username": username,
            "password": hashed_password.decode('utf-8'),  # Store the hashed password as a string
        }
        result = loginCollection.insert_one(user)
        user_id = str(result.inserted_id)
        return jsonify({"message": "User created successfully", "user_id": user_id}), 201
    
    
        