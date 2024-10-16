import * as tf from '@tensorflow/tfjs';

function TrainModel({ model }) {
    useEffect(() => {
      if (!model) return;
  
      const dataset = [
        { temperature: 36.5, spo2: 97, heartRate: 75, outcome: 0 }, 
        { temperature: 38.2, spo2: 85, heartRate: 110, outcome: 1 }, 
        // Add more data here
      ];
  
      const X = dataset.map(({ temperature, spo2, heartRate }) => [temperature, spo2, heartRate]);
      const y = dataset.map(({ outcome }) => outcome);
  
      const xs = tf.tensor2d(X);
      const ys = tf.tensor2d(y, [y.length, 1]);
  
      model.fit(xs, ys, { epochs: 100 }).then(() => {
        console.log('Model training complete');
      });
    }, [model]);
  
    return null;
  }
  
  export default TrainModel;
  