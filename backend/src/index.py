from flask import Flask
from routes.contexto import contexto
from flask_cors import CORS
from routes.login import login
    
app = Flask(__name__)
CORS(app)
app.register_blueprint(contexto)
app.register_blueprint(login)

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)