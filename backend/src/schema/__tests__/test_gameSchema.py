import pytest
import pymongo
from pymongo.errors import CollectionInvalid

from ..gameSchema import schema

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["poly_gusser"]

def test_create_collection():
    try:
        db.create_collection("contexto", validator=schema)
        assert True
    except CollectionInvalid:
        assert False

def test_insert_valid_document():
    db.contexto.insert_one({
        "date": "2023-01-01",
        "game_word": "example",
        "game_word_length": 7
    })
    assert db.contexto.count_documents({}) == 1

def test_insert_invalid_document():
    with pytest.raises(pymongo.errors.WriteError):
        db.contexto.insert_one({
            "date": "2023-01-01",
            "game_word": "example"
            # Missing "game_word_length"
        })