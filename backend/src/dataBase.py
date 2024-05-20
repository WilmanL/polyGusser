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
        loginDataCollection = db["account_info"]
        return (contextoCollection, userGuessCollection, loginDataCollection)
        
    except pymongo.errors.ServerSelectionTimeoutError as err:
        print("Failed to connect to server:", err)