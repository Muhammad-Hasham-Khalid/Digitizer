from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

model = load_model("./model/trained_model.h5")

@app.route("/", methods=['POST'])
def index():
    if request.method == 'POST':
        try:
            image = Image.open(request.files.get('image-file')).convert('L')
            npImage = np.array(image)
            res = np.argmax(model.predict(npImage.reshape(-1, 784)))
            return f"{res}"
        except Exception as e:
            print(e)
            return "Error"
            

if __name__ == '__main__':
    app.run(debug=True, port=5000)
