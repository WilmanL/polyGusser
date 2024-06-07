from flask import Blueprint, request, jsonify
from datetime import datetime
import random
from bson.json_util import dumps
from dataBase import get_db
from nltk.corpus import words

# @brief: gets the functional access to contexto collection
contextoCollection, userGuessCollection, leaderboardCollection, userLoginCollection = get_db()

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

# @brief: check if the word is successfully guessed or not
def guess_update(wordList):
    guessed = True
    for i in range(len(wordList)):
        if wordList[i]['color'] != 'green':
            guessed = False
            break
    return guessed

# @brief: route to contexto endpoint
contexto = Blueprint('contexto', __name__)
@contexto.route('/polygusser/contexto')
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

    # check if user has previously guessed the word or not in all the guesses
    previous_guesses = userGuessCollection.find({"user_id": user_id, "date": str(currDate)})
    for guess in previous_guesses:
        if guess["guessed"]:
            return jsonify({"similarity": similarity, "guessed": guess["guessed"], "guessNumber": guess["guess_number"]})


    if guess_word != '':
        similarity = findSimilarity(guess_word, result['game_word'])

        # find previous max number, if it exist and update the current guess number
        max_guess_document = userGuessCollection.find_one({"user_id": user_id, "date": str(currDate)}, sort=[("guess_number", -1)])
        if max_guess_document is not None:
            max_guess_number = max_guess_document["guess_number"] + 1
        else:
            max_guess_number = 1
        
        guessed = guess_update(similarity)
        
        userGuessCollection.insert_one({"user_id": user_id, "guess_number": max_guess_number, "guess_word": guess_word, "date": str(currDate), "guessed": guessed})
        return jsonify({"similarity": similarity, "guessed": guessed, "guessNumber": max_guess_number})
    
    # default return empty
    if not similarity:
        return jsonify([])


# @brief: route to get result of the day
@contexto.route('/polygusser/contexto_result')
def get_contexto_result():
    user_id = ''
    user_id = request.args.get('user_id', default = '', type = str)
    currDate = datetime.now().date()
    result = userGuessCollection.find_one({"user_id": user_id, "date": str(currDate)}, sort=[("guess_number", -1)])
    wordInfo = contextoCollection.find_one({"date": str(currDate)})

    # temp set the userName
    user_name = "Dhruv"
    
    # check if the user is successfully guessed the word
    if result is not None and result["guessed"]:
        existing_entry = leaderboardCollection.find_one({"user_id": result["user_id"], "date": str(currDate)})
        if existing_entry is None:
            leaderboardCollection.insert_one({"user_id": result["user_id"], "user_name": user_name, "date": str(currDate), "wordOfDay": wordInfo["game_word"], "number_of_guesses": result["guess_number"]})    
    
    return dumps({"result": result, "wordInfo": wordInfo})

# @brief: route to get leaderboard
@contexto.route('/polygusser/leaderboard')
def get_leaderboard():
    currDate = datetime.now().date()
    result = leaderboardCollection.find({"date": str(currDate)}, sort=[("number_of_guesses", 1)])
    return dumps(result)

