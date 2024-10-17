import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Step 1: Load your data
data = pd.read_csv('C:\\Users\\rosha\\Desktop\\project\\Smart-Healthcare\\src\\components\\MachineLearning\\health_data.csv')

# Features and target variable
X = data[['Temperature (°C)', 'SpO2 (%)', 'HeartRate (BPM)']]  # Features
y = data['Health Status']  # Target

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Train the model
model = LogisticRegression()
model.fit(X_train, y_train)

# Step 4: Evaluate the model
y_pred = model.predict(X_test)

# Print evaluation metrics
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Step 5: Visualize and save the confusion matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.ylabel('Actual')
plt.xlabel('Predicted')
plt.title('Confusion Matrix')
plt.savefig('confusion_matrix.png')  # Save the figure
plt.show()

# Step 6: Save the trained model
joblib.dump(model, 'health_model.pkl')

# Step 7: Create a prediction function
def predict_health_status(temperature, spo2, heart_rate):
    # Prepare the input data for prediction
    input_data = pd.DataFrame([[temperature, spo2, heart_rate]], columns=['Temperature (°C)', 'SpO2 (%)', 'HeartRate (BPM)'])
    prediction = model.predict(input_data)
    return prediction[0]

# Example usage of the prediction function
if __name__ == "__main__":
    # Test with example input
    result = predict_health_status(37.5, 95, 75)
    print(f'Predicted Health Status: {result}')
