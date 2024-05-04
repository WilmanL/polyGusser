from flask import Blueprint, request, jsonify
from datetime import datetime
from gensim.models import KeyedVectors
import random
import json
from dataBase import get_db

# @brief: gets the functional access to contexto collection
contextoCollection = get_db()

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
    similarity = model.similarity(wordOfTheDay, guess_word)
    return similarity


# @brief: route to contexto endpoint
contexto = Blueprint('contexto', __name__)
@contexto.route('/polygusser/contexto')
def get_contexto():
    guess_word = ''
    guess_word = request.args.get('guess_word', default = '', type = str)
    wordSetup()
    currDate = datetime.now().date()
    result = contextoCollection.find_one({"date": str(currDate)})
    if guess_word != '':
        similarity = findSimilarity(guess_word, result['game_word'])
        return jsonify({"similarity": str(similarity)})
    
    # default return empty string
    return jsonify({"similarity": ''})

