from flask import Blueprint, request, jsonify
from datetime import datetime
from bson.json_util import dumps
from dataBase import get_db
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import timedelta
import bcrypt
import json
from bson import ObjectId

# @brief: gets the functional access to contexto collection
contextoCollection, userGuessCollection, leaderboardCollection, userLoginCollection, wallSchemaCollection, userBioSchemaCollection = get_db()

# @brief: route to auth endpoint
auth = Blueprint('auth', __name__)
@auth.route('/polyguesser/register', methods=['POST'])
def register():
    data = request.get_json()
    user_name = data.get('userName', '')
    password = data.get('password', '')
    userBioData = data.get('userBioData', {})

    print(user_name)
    print(password)

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insert user login data
    userLoginData = {
        "user_name": user_name,
        "password": hashed_password,
    }
    userLoginCollection.insert_one(userLoginData)

    # Insert user bio data
    userBioData['userId'] = userLoginData['_id']
    userBioData['user_name'] = userLoginData["user_name"]
    userBioSchemaCollection.insert_one(userBioData)

    return jsonify({"msg": "User created successfully"}), 200

@auth.route('/polyguesser/login', methods=['POST'])
def login():
    user_name = request.args.get('userName', default = '', type = str)
    password = request.args.get('password', default = '', type = str)

    users = userLoginCollection.find({"user_name": user_name})
    
    for user in users:
        print(user)
        if (bcrypt.checkpw(password.encode('utf-8'), user['password']) and user['user_name'] == user_name):
            expires = timedelta(days=1)
            access_token = create_access_token(identity=user_name, expires_delta=expires)
            return jsonify(access_token=access_token, userId=str(user['_id']), userName=str(user['user_name'])), 200
    
    return jsonify({"msg": "Bad username or password"}), 401


# returns the entire collection of userBioSchema
@auth.route('/polyguesser/userBio')
def getUserBio():
    userId = request.args.get('userId', default = '', type = str)
    userBio = userBioSchemaCollection.find_one({"userId": ObjectId(userId)})
    return dumps(userBio), 200
