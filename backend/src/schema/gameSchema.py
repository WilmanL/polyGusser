import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

# game schema for storing each day game data
schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["date", "game_word", "game_word_length"],
        "properties": {
            "date": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "game_word": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "game_word_length": {
                "bsonType": "int",
                "description": "must be an integer and is required"
            },
        }
    }
}

# Create a new collection with schema validation
db.create_collection("contexto", validator=schema)