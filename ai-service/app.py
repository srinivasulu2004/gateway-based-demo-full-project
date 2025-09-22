from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/predict")
def predict():
    return jsonify({"prediction": "This is a demo AI response"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)

