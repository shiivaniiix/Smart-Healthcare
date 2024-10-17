import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const SalineFlowEstimator = () => {
  const flowRates = [
    { mode: 'Normal', rate: 50, dropFactor: 15 },
    { mode: 'Medium', rate: 100, dropFactor: 15 },
    { mode: 'High', rate: 200, dropFactor: 15 },
  ];

  const [selectedMode, setSelectedMode] = useState(flowRates[0].mode);
  const [dropsPerSecond, setDropsPerSecond] = useState(0);
  const [timeEstimation, setTimeEstimation] = useState(0);
  const [salineWeight, setSalineWeight] = useState(0);
  const [dataPoints, setDataPoints] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);
  const [currentDrops, setCurrentDrops] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const calculateDropsPerSecond = (flowRate, dropFactor) => {
    return (flowRate * dropFactor) / 3600; // drops per second
  };

  const calculateFlowRateInMlPerSecond = (flowRate, dropFactor) => {
    const drops = calculateDropsPerSecond(flowRate, dropFactor);
    return drops / dropFactor; // Convert drops to mL
  };

  const calculateTimeEstimation = (weight) => {
    const selectedRate = flowRates.find(flow => flow.mode === selectedMode);
    const dropsPerSec = calculateDropsPerSecond(selectedRate.rate, selectedRate.dropFactor);
    return dropsPerSec > 0 ? weight / dropsPerSec / 60 : 0; // Time in minutes
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    const selectedRate = flowRates.find(flow => flow.mode === mode);
    const drops = calculateDropsPerSecond(selectedRate.rate, selectedRate.dropFactor);
    setDropsPerSecond(drops);

    const estimatedTime = calculateTimeEstimation(salineWeight);
    setTimeEstimation(estimatedTime);
    const newDataPoints = Array.from({ length: Math.ceil(estimatedTime) + 1 }, (_, i) => drops * i);
    setDataPoints(newDataPoints);

    if (salineWeight > 0) {
      startTimer(estimatedTime);
    }
  };

  const startTimer = (estimatedTime) => {
    if (timerId) {
      clearInterval(timerId);
    }

    const totalSeconds = Math.ceil(estimatedTime * 60);
    setRemainingTime(totalSeconds);

    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          alert('Saline has Reached Its threshold value');
          return 0;
        }
        setCurrentDrops((prevDrops) => prevDrops + dropsPerSecond);
        return prev - 1;
      });
    }, 1000);

    setTimerId(id);
  };

  useEffect(() => {
    handleModeChange(selectedMode);
  }, [selectedMode, salineWeight]);

  // New state for flow rate in mL/s
  const flowRateInMlPerSecond = calculateFlowRateInMlPerSecond(flowRates.find(flow => flow.mode === selectedMode).rate, flowRates.find(flow => flow.mode === selectedMode).dropFactor);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center mb-4">Saline Level Estimator</h2>

      <h3 className="text-xl font-semibold mb-4">Select Saline Flow Rate Mode:</h3>
      <div className="flex justify-around mb-4">
        {flowRates.map(flow => (
          <button
            key={flow.mode}
            onClick={() => handleModeChange(flow.mode)}
            className={`transition-colors duration-300 px-4 py-2 rounded-lg text-white 
              ${selectedMode === flow.mode ? 'bg-[#4e73df] hover:bg-[#3b5dce]' : 'bg-[#4e73df] hover:bg-[#3b5dce]'}`}
          >
            {flow.mode}
          </button>
        ))}
      </div>

      <h4 className="text-lg font-semibold mb-2">Selected Mode: {selectedMode}</h4>
      <p className="mb-2 text-lg">Drops per Second: {dropsPerSecond.toFixed(2)} gtt/s</p>
      <p className="mb-2 text-lg">Flow Rate: {flowRateInMlPerSecond.toFixed(2)} mL/s</p> {/* New line for mL/s */}
      <p className="mb-4 text-lg">Estimated Time: {timeEstimation.toFixed(2)} minutes</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter Saline Weight (g):</label>
        <input
          type="number"
          value={salineWeight}
          onChange={(e) => {
            const weight = parseFloat(e.target.value);
            setSalineWeight(weight);
            const estimatedTime = calculateTimeEstimation(weight);
            setTimeEstimation(estimatedTime);
            const newDataPoints = Array.from({ length: Math.ceil(estimatedTime) + 1 }, (_, i) => dropsPerSecond * i);
            setDataPoints(newDataPoints);

            if (weight > 0) {
              startTimer(estimatedTime);
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold">Time Remaining:</h4>
        <p className="text-2xl">
          {remainingTime !== null ? `${Math.floor(remainingTime / 60)}:${('0' + (remainingTime % 60)).slice(-2)}` : 'N/A'}
        </p>
      </div>

      <Plot
        data={[
          {
            x: Array.from({ length: dataPoints.length }, (_, i) => i),
            y: dataPoints,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            name: 'Expected Flow Rate (gtt)',
          },
          {
            x: Array.from({ length: Math.ceil(timeEstimation) * 60 }, (_, i) => i),
            y: Array.from({ length: Math.ceil(timeEstimation) * 60 }, (_, i) => (dropsPerSecond * i)),
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'yellow' },
            name: 'Live Flow Rate (gtt)',
          },
        ]}
        layout={{
          title: `Saline Flow Rate Over Time - ${selectedMode} Mode`,
          xaxis: { title: 'Time (seconds)', showgrid: true },
          yaxis: { title: 'Total Drops (gtt)', showgrid: true },
          showlegend: true,
          plot_bgcolor: '#f4f4f4',
          paper_bgcolor: '#f4f4f4',
        }}
      />
    </div>
  );
};

export default SalineFlowEstimator;
