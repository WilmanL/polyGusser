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

# Define the token_required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        # Here, you would typically verify the token
        # For demonstration purposes, let's assume the token is valid
        return f(*args, **kwargs)

    return decorated

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/protected')
@token_required
def protected():
    return jsonify({'message': 'This is only available for people with valid tokens.'})

if __name__ == '__main__':
    loginCollection, contextoCollection, userGuessCollection = get_db()  # Unpack the database and collections
    app.run(debug=True, port=5000)
