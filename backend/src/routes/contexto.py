# backend/src/routes/contexto.py

from flask import Blueprint, request, jsonify
from datetime import datetime
from dataBase import get_db
import jwt

contexto = Blueprint('contexto', __name__)
loginDataCollection, contextoCollection, userGuessCollection = get_db()
SECRET_KEY = "your_secret_key"  # Ensure this matches your actual secret key

@contexto.route('/contexto', methods=['GET'])
def get_contexto():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token is missing!'}), 403

    try:
        jwt.decode(token.split()[1], SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired!'}), 403
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token!'}), 403

    guess_word = request.args.get('guess_word', default='', type=str)
    user_id = request.args.get('user_id', default='', type=str)
    similarity = []
    guessed = False

    currDate = datetime.now().date()
    result = contextoCollection.find_one({"date": str(currDate)})
    if result and guess_word:
        similarity = findSimilarity(guess_word, result['game_word'])

        max_guess_document = userGuessCollection.find_one({"user_id": user_id}, sort=[("guess_number", -1)])
        if max_guess_document is not None:
            max_guess_number = max_guess_document["guess_number"] + 1
        else:
            max_guess_number = 1
        
        userGuessCollection.insert_one({"user_id": user_id, "guess_number": max_guess_number, "guess_word": guess_word, "date": str(currDate), "guessed": guessed})
    
    return jsonify(similarity)

def findSimilarity(guess_word, game_word):
    wordList = []
    guess_word = guess_word.lower()
    for i in range(len(guess_word)):
        if guess_word[i] == game_word[i]:
            CharInCommon = {'index': i, 'guessCharacter': guess_word[i], 'color': 'green'}
            wordList.append(CharInCommon)
        elif guess_word[i] in game_word:
            CharInCommon = {'index': i, 'guessCharacter': guess_word[i], 'color': 'yellow'}
            wordList.append(CharInCommon)
        else:
            CharInCommon = {'index': i, 'guessCharacter': guess_word[i], 'color': 'grey'}
            wordList.append(CharInCommon)
    return wordList

def wordSetup():
    currDate = datetime.now().date()
    result = contextoCollection.find_one({"date": str(currDate)})
    if result is None:
        word_list = [word for word in words.words() if len(word) == 5]
        random_word = random.choice(word_list).lower()
        word_length = len(random_word)
        contextoCollection.insert_one({"date": str(currDate), "game_word": random_word, "game_word_length": word_length})
