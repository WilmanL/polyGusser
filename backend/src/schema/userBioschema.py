import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["userId","user_name", "school", "work", "location", "from", "about", ],
        "properties": {
            "userId": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "user_name": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "school": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "work": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "location": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "from": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "about": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
        }
    }
}

# Create a new collection with schema validation
db.create_collection("userBioSchema", validator=schema)