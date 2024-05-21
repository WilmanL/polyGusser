from flask import Blueprint, request, jsonify
from datetime import datetime
from gensim.models import KeyedVectors
import random
import json
from bson.json_util import dumps
from dataBase import get_db

# @brief: gets the functional access to contexto collection
contextoCollection, userGuessCollection = get_db()

# @brief: Setup the word for the day in the database if not present
def wordSetup():
    currDate = datetime.now().date()
    result = contextoCollection.find_one({"date": str(currDate)})
    if result is None:
        word2vec_file = './models/glove.6B.50d.word2vec.txt'
        model = KeyedVectors.load_word2vec_format(word2vec_file, binary=False)
        words =  model.index_to_key
        random_word = random.choice(words)
        word_length = len(random_word)
        contextoCollection.insert_one({"date": str(currDate), "game_word": random_word, "game_word_length": word_length})

def findSimilarity(guess_word, wordOfTheDay):
    word2vec_file = './models/glove.6B.50d.word2vec.txt'
    model = KeyedVectors.load_word2vec_format(word2vec_file, binary=False)

    # if user enters some gibberish word that is not in the model
    if guess_word not in model:
        return 0.0

    similarity = model.similarity(wordOfTheDay, guess_word)
    return similarity


# @brief: route to contexto endpoint
contexto = Blueprint('contexto', __name__)
@contexto.route('/polygusser/contexto')
def get_contexto():
    guess_word = ''
    guessed = False
    user_id = ''
    guess_word = request.args.get('guess_word', default = '', type = str)
    user_id = request.args.get('user_id', default = '', type = str)
    wordSetup()
    currDate = datetime.now().date()
    result = contextoCollection.find_one({"date": str(currDate)})
    if guess_word != '':
        similarity = findSimilarity(guess_word, result['game_word'])

        # find previous max number, if it exist and update the current guess number
        max_guess_document = userGuessCollection.find_one({"user_id": user_id}, sort=[("guess_number", -1)])
        if max_guess_document is not None:
            max_guess_number = max_guess_document["guess_number"] + 1
        else:
            max_guess_number = 1

        # if user successfully guesses the word
        if similarity >= 1.0:
            guessed = True
        
        userGuessCollection.insert_one({"user_id": user_id, "guess_number": max_guess_number, "guess_word": guess_word, "similarity": float(similarity), "date": str(currDate), "guessed": guessed})

        document_today = userGuessCollection.find({"date": str(currDate), "user_id": user_id})
        document_today = [json.loads(dumps(doc)) for doc in document_today]
        return jsonify(document_today)
    
    # default return empty string
    document_today = userGuessCollection.find({"date": str(currDate), "user_id": user_id})
    if document_today is None:
        return jsonify([])
    document_today = [json.loads(dumps(doc)) for doc in document_today]
    return jsonify(document_today)

