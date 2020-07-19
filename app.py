from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        image = request.files['image'].read()
        print(image)
        return "POST"
    else:
        return "GET"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
