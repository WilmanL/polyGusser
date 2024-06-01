import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

# game schema for storing each day game data
schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["username", "password"],
        # "required": ["username","first_name", "last_name", "email", "password"],
        "properties": {
            "username": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            # "first_name": {
            #     "bsonType": "string",
            #     "description": "must be a string and is required"
            # },
            # "last_name": {
            #     "bsonType": "string",
            #     "description": "must be a string and is required"
            # },
            # "email": {
            #     "bsonType": "string",
            #     "description": "must be a string and is required"
            # },
            "password": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
        }
    }
}

# Create a new collection with schema validation
db.create_collection("account_info", validator=schema)