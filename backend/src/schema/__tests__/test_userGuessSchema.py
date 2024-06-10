import pytest
import pymongo
from pymongo.errors import CollectionInvalid

from ..userGuessSchema import schema

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

def test_create_collection():
    try:
        db.create_collection("userGuessSchema", validator=schema)
        assert True
    except CollectionInvalid:
        assert False

def test_insert_valid_document():
    db.userGuessSchema.insert_one({
        "user_id": "user123",
        "guess_number": 1,
        "date": "2023-01-01",
        "guess_word": "example",
        "guessed": True
    })
    assert db.userGuessSchema.count_documents({}) == 1

def test_insert_invalid_document():
    with pytest.raises(pymongo.errors.WriteError):
        db.userGuessSchema.insert_one({
            "user_id": "user123",
            "guess_number": 1,
            "date": "2023-01-01"
            # Missing "guess_word" and "guessed"
        })