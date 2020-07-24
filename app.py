from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
import os, json

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.getcwd(), 'model', 'trained_model.h5')
model = load_model(model_path)

@app.route("/", methods=['POST'])
def index():
    if request.method == 'POST':
        try:
            # image = Image.open(request.files.get('image-file')).convert('L')
            pixels = np.array(json.loads(request.form.get('pixels')).get('values'))
            # image operations
            # newsize = (28, 28) 
            # image = image.resize(newsize) 
            # npImage = np.array(image)
            # npImage = npImage.astype('float32') / 255

            # pixels operations
            pixels = Image.fromarray(pixels.reshape(400, 400, 4).astype(np.uint8)).convert('L')
            # pixels = np.resize(pixels, (28, 28))
            pixels = np.array(pixels.resize((28, 28))).astype('float32') / 255
            print(pixels.shape)
            res = np.argmax(model.predict(pixels.reshape(-1, 784)))
            # res = 1
            return f"{res}"
        except Exception as e:
            print(e)
            return "Error"
            

if __name__ == '__main__':
    app.run(debug=True, port=5000)
