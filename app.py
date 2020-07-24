from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
from os import path   # for creating path
from os import getcwd # for getting current working dir
from json import loads
from math import sqrt

app = Flask(__name__)
CORS(app)

model_path = path.join(getcwd(), 'model', 'mnist_model.h5')
model = load_model(model_path)

@app.route("/", methods=['POST'])
def index():
    if request.method == 'POST':
        try:
            pixels = np.array(loads(request.form.get('pixels')).get('values'))
            dim = int(sqrt(pixels.shape[0] / 4))
            new_shape = (dim, dim, 4)
            
            # pixels operations
            tempImage = Image.fromarray(pixels.reshape(*new_shape).astype(np.uint8)).convert('L')
            pixels = np.array(tempImage.resize((28, 28))).astype('float32') / 255
            res = np.argmax(model.predict(pixels.reshape(-1, 784)))
            return f"{res}"
        except Exception as e:
            print(e)
            return "Error"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
