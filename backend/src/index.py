from flask import Flask
from flask_cors import CORS
from routes.contexto import contexto
from routes.login import login
from routes.signup import signup

app = Flask(__name__)
CORS(app)

app.register_blueprint(contexto, url_prefix='/polyguesser')
app.register_blueprint(login, url_prefix='/polyguesser')
app.register_blueprint(signup, url_prefix='/polyguesser')

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)