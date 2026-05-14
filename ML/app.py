# AI Fraud Detection API
from flask import Flask, request, jsonify # Flask app , request data , JSON response , 
from flask_cors import CORS # React/Node backend to access Flask API
import joblib # save ML model load ML model
import numpy as np  # Used to create ML input arrays.

app = Flask(__name__) # 

CORS(app)

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "ML Fraud Detection API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        amount = data["amount"]
        targetAmount = data["targetAmount"]
        raisedAmount = data["raisedAmount"]
        donationCount = data["donationCount"]
        userDonationCount = data["userDonationCount"]

        features = np.array([[
            amount,
            targetAmount,
            raisedAmount,
            donationCount,
            userDonationCount
        ]])
        
        prediction = model.predict(features)[0]

        
        probability = model.predict_proba(features)[0][1]

    
        result = "suspicious" if prediction == 1 else "safe"

        return jsonify({
            "prediction": result,
            "fraudScore": float(probability)
        })

    except Exception as error:

        return jsonify({
            "error": str(error)
        })
if __name__ == "__main__":
    app.run(debug=True, port=5000)