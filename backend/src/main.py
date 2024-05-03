# Import the necessary class from gensim
from gensim.models import KeyedVectors
import random

# Define the file path
word2vec_file = './src/glove.6B.50d.word2vec.txt'  # Update this path to your Word2Vec file

# Load the model
model = KeyedVectors.load_word2vec_format(word2vec_file, binary=False)

words =  model.index_to_key

# random_word = random.choice(words)

# print(f"Random word: {random_word}")

# Calculate the similarity between two words
similarity = model.similarity('66-yard', 'ipad')

# Print the similarity
print(f"The similarity between words is: {similarity * 100:.2f}%")