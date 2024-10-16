import { useState, useEffect } from 'react';

function calculateZScore(data, populationMean) {
  const sampleMean = data.reduce((sum, value) => sum + value, 0) / data.length;
  const sampleVariance = data.reduce((sum, value) => sum + Math.pow(value - sampleMean, 2), 0) / (data.length - 1);
  const sampleStdDev = Math.sqrt(sampleVariance);
  const zScore = (sampleMean - populationMean) / (sampleStdDev / Math.sqrt(data.length));
  return zScore;
}

function ZTest() {
  const [zScore, setZScore] = useState(null);

  const temperatureReadings = [36.5, 37.1, 38.0, 36.8, 37.2, 37.4];

  useEffect(() => {
    const score = calculateZScore(temperatureReadings, 37); // Normal body temperature mean is 37°C
    setZScore(score);
  }, []);

  return (
    <div>
      <h1>Z-Test for Temperature Readings</h1>
      {zScore && (
        <p>Z-Score: {zScore} {Math.abs(zScore) > 1.96 ? '(Significant)' : '(Not Significant)'}</p>
      )}
    </div>
  );
}

export default ZTest;
