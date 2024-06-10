import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["user_name", "password"],
        "properties": {
            "user_name": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "password": {
                "bsonType": "binData",
                "description": "must be binary data and is required"
            },
        }
    }
}

# Create a new collection with schema validation
db.create_collection("userLogin", validator=schema)