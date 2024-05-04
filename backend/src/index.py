from flask import Flask
from routes.contexto import contexto

    
app = Flask(__name__)
app.register_blueprint(contexto)

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)