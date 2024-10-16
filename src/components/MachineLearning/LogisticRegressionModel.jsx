import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';

function LogisticRegressionModel() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const logisticModel = tf.sequential();
    logisticModel.add(tf.layers.dense({ units: 1, inputShape: [3], activation: 'sigmoid' }));
    logisticModel.compile({
      optimizer: tf.train.adam(),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });

    setModel(logisticModel);
  }, []);

  return model;
}

export default LogisticRegressionModel;
