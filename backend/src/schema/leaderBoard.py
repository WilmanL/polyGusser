import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

# game schema for storing each day game data
schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["user_id","user_name", "date", "wordOfDay", "number_of_guesses"],
        "properties": {
            "user_id": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "guess_number": {
                "bsonType": "int",
                "description": "must be an integer and is required"
            },
            "date": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "wordOfDay": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "number_of_guesses": {
                "bsonType": "int",
                "description": "must be an integer and is required"
            },
        }
    }
}

# Create a new collection with schema validation
db.create_collection("leaderBoard", validator=schema)