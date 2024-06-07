import pymongo

# @brief: Get the database connection and return the collections
def get_db():
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        client.server_info()
        print("Connection successful")
        db = client["poly_gusser"]
        contextoCollection = db["contexto"]
        userGuessCollection = db["userGuessSchema"]
        leaderboardCollection = db["leaderBoard"]
        userLoginCollection = db["userLogin"]
        wallSchemaCollection = db["wallSchema"]
        return (contextoCollection, userGuessCollection, leaderboardCollection, userLoginCollection, wallSchemaCollection)
    except pymongo.errors.ServerSelectionTimeoutError as err:
        print("Failed to connect to server:", err)