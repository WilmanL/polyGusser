from flask import Blueprint, request, jsonify
from datetime import datetime
from gensim.models import KeyedVectors
import random
import json
from bson.json_util import dumps
from dataBase import get_db
from nltk.corpus import words

# @brief: gets the functional access to contexto collection
contextoCollection, userGuessCollection, loginCollection = get_db()

# @brief: Setup the word for the day in the database if not present
def wordSetup():
    currDate = datetime.now().date()
    result = contextoCollection.find_one({"date": str(currDate)})
    if result is None:
        word_list = [word for word in words.words() if len(word) == 5]
        random_word = random.choice(word_list).lower()
        word_length = len(random_word)
        contextoCollection.insert_one({"date": str(currDate), "game_word": random_word, "game_word_length": word_length})

def findSimilarity(guess_word, wordOfTheDay):
    wordList = []
    guess_word = guess_word.lower()
    for i in range(len(guess_word)):
        if guess_word[i] == wordOfTheDay[i]:
            CharInCommon = {'index': i, 'guessCharacter': guess_word[i], 'color': 'green'}
            wordList.append(CharInCommon)
        elif guess_word[i] in wordOfTheDay:
            CharInCommon = {'index': i, 'guessCharacter': guess_word[i], 'color': 'yellow'}
            wordList.append(CharInCommon)
        else:
            CharInCommon = {'index': i, 'guessCharacter': guess_word[i], 'color': 'grey'}
            wordList.append(CharInCommon)
    return wordList


# @brief: route to contexto endpoint
contexto = Blueprint('contexto', __name__)
@contexto.route('/polyguesser/contexto')
def get_contexto():
    guess_word = ''
    guessed = False
    user_id = ''
    similarity = []
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
        
        userGuessCollection.insert_one({"user_id": user_id, "guess_number": max_guess_number, "guess_word": guess_word, "date": str(currDate), "guessed": guessed})
        return jsonify(similarity)
    
    # default return empty
    if not similarity:
        return jsonify([])

