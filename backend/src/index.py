# backend/src/index.py

from flask import Flask, jsonify
from flask_cors import CORS
from routes.contexto import contexto
from routes.login import login
from routes.signup import signup
from dataBase import get_db  # Import the get_db function
from functools import wraps
from flask import request

app = Flask(__name__)
CORS(app)

app.register_blueprint(contexto, url_prefix='/polyguesser')
app.register_blueprint(login, url_prefix='/polyguesser')
app.register_blueprint(signup, url_prefix='/polyguesser')

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/protected')
def protected():
    return jsonify({'message': 'This is only available for people with valid tokens.'})

if __name__ == '__main__':
    loginCollection, contextoCollection, userGuessCollection = get_db()  # Unpack the database and collections
    app.run(debug=True, port=5000)
