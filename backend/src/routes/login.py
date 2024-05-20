from flask import Blueprint, request, jsonify
from datetime import datetime
from gensim.models import KeyedVectors
import random
import json
from bson.json_util import dumps
from dataBase import get_db
import bcrypt

loginCollection = get_db()

login = Blueprint('login', __name__)
@login.route('/polyguesser/login', methods=['POST'])
def userLogin():
    username = ''
    password = ''
    username = request.args.get('username', default = None, type = str)
    password = request.args.get('password', default = None, type = str)
    if not username or not password:
        return jsonify("error:" "Username and password required"), 400
        # Find the user in the database
    user = loginCollection.find_one({'username': username})
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

        # Check the password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful", "user_id": str(user['_id'])}), 200
        