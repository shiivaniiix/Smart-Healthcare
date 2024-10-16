import { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function Predict({ model }) {
  const [prediction, setPrediction] = useState(null);

  const predictOutcome = (temperature, spo2, heartRate) => {
    const inputData = tf.tensor2d([[temperature, spo2, heartRate]]);
    const predictionValue = model.predict(inputData).dataSync()[0];
    setPrediction(predictionValue > 0.5 ? 'Abnormal' : 'Normal');
  };

  return (
    <div>
      <button onClick={() => predictOutcome(37.0, 92, 100)}>Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default Predict;
