import joblib
import pandas as pd
from flask import Flask, request, jsonify

# Load the trained model
model = joblib.load('health_model.pkl')

# Function to make predictions
def predict_health_status(temperature, spo2, heart_rate):
    # Prepare the input data
    input_data = pd.DataFrame([[temperature, spo2, heart_rate]], columns=['Temperature (°C)', 'SpO2 (%)', 'HeartRate (BPM)'])
    # Make a prediction
    prediction = model.predict(input_data)
    return prediction[0]

# Create a Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    temperature = data['temperature']
    spo2 = data['spo2']
    heart_rate = data['heart_rate']
    
    # Get the prediction
    prediction = predict_health_status(temperature, spo2, heart_rate)
    return jsonify({'predicted_health_status': prediction})

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
