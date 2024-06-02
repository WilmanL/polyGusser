# backend/src/schema/userGuessSchema.py

import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

# game schema for storing each day game data
schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["user_id","guess_number", "date", "guess_word", "guessed"],
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
            "guess_word": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "guessed": {
                "bsonType": "bool",
                "description": "must be a bool and is required"
            },
        }
    }
}

# Create a new collection with schema validation
db.create_collection("userGuessSchema", validator=schema)