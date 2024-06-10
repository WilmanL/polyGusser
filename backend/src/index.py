from flask import Flask
from routes.contexto import contexto
from routes.authentication import auth
from flask_cors import CORS
from flask_jwt_extended import JWTManager
    
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "polyGuesserGuessedIt"
jwt = JWTManager(app)
app.register_blueprint(contexto)
app.register_blueprint(auth)


@app.route('/')
def home():
    return "Hello, World!"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
