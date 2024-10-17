from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load('health_model.pkl')

@app.route('/')
def home():
    return "Welcome to the Health Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    print("Received request")  # Debug statement to show request is received
    # Get data from the request
    data = request.get_json()

    # Extract temperature, SpO2, and heart rate from the request
    temperature = data.get('temperature')
    spo2 = data.get('spo2')
    heart_rate = data.get('heart_rate')

    # Prepare the input data for prediction
    input_data = pd.DataFrame([[temperature, spo2, heart_rate]], columns=['Temperature (°C)', 'SpO2 (%)', 'HeartRate (BPM)'])
    
    # Make a prediction
    prediction = model.predict(input_data)
    
    # Return the prediction as JSON
    return jsonify({'predicted_health_status': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
