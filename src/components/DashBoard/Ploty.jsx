import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import TemperatureCard from './TemperatureCard';
import HeartRateCard from './HeartRate';
import OxygenCard from './OxygenCard';
import GroupCard from './GroupCard';

function Ploty() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [spo2Data, setSpo2Data] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate random values for each sensor
  const generateRandomValues = () => {
    const randomTemp = (Math.random() * (39 - 35) + 35).toFixed(2); // Generate random temperature between 35-39 ℃
    const randomSpo2 = Math.floor(Math.random() * (99 - 85) + 85);   // Generate random SpO2 between 91-99%
    const randomHeartRate = Math.floor(Math.random() * (130 - 50) + 50); // Generate random heart rate between 60-110 BPM
    return { randomTemp, randomSpo2, randomHeartRate };
  };

  useEffect(() => {
    const updateData = () => {
      const { randomTemp, randomSpo2, randomHeartRate } = generateRandomValues();
      const newTimestamp = new Date().toLocaleTimeString();

      setTemperatureData(prevData => [...prevData.slice(-50), randomTemp]); // Limit data to last 50 points
      setSpo2Data(prevData => [...prevData.slice(-50), randomSpo2]);
      setHeartRateData(prevData => [...prevData.slice(-50), randomHeartRate]);
      setTimestamps(prevTimestamps => [...prevTimestamps.slice(-50), newTimestamp]);
      setLoading(false);
    };

    const interval = setInterval(updateData, 3000); // Generate random values every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center text-lg">Loading data...</div>;

  // Define manual threshold values
  const tempWorstLow = 30;
  const tempWorstHigh = 37;
  const spo2WorstLow = 90;
  const heartRateWorstLow = 60;
  const heartRateWorstHigh = 120;

  // Calculate percentage within threshold
  const calcThresholdPercentage = (data, low, high) => {
    const withinThreshold = data.filter(value => value >= low && value <= high).length;
    return ((withinThreshold / data.length) * 100).toFixed(2);
  };

  const tempInThresholdPercentage = calcThresholdPercentage(temperatureData, tempWorstLow, tempWorstHigh);
  const spo2InThresholdPercentage = calcThresholdPercentage(spo2Data, spo2WorstLow, 100); // Assuming max is 100
  const heartRateInThresholdPercentage = calcThresholdPercentage(heartRateData, heartRateWorstLow, heartRateWorstHigh);

  // Function to calculate average
  const calculateAverage = (data) => {
    const sum = data.reduce((acc, val) => acc + Number(val), 0);
    return (sum / data.length).toFixed(2);
  };

  const avgTemperature = calculateAverage(temperatureData);
  const avgSpO2 = calculateAverage(spo2Data);
  const avgHeartRate = calculateAverage(heartRateData);

  return (
    <div className="p-4 space-y-12">
      {/* Display Average Values */}
      <div className="grid grid-cols-4 gap-8 pr-4">
        {/* <h2 className="text-xl font-semibold">Average Values</h2> */}
        {/* <p className="text-lg">Temperature: {avgTemperature} ℃</p> */}
        <TemperatureCard averageTemperature={avgTemperature} />
        <OxygenCard averageOxygen = {avgSpO2} />
        <HeartRateCard averageHeartRate = {avgHeartRate} />
        <GroupCard />
        {/* <p className="text-lg">SpO2: {avgSpO2} %</p>
        <p className="text-lg">Heart Rate: {avgHeartRate} BPM</p> */}
      </div>

      {/* Temperature Section */}
      <div className="chart-section mb-8 grid grid-cols-3 gap-4">
        {/* Temperature Plot (occupying 2 columns) */}
        <div className='col-span-2'>
          <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Temperature Plot (℃)</h2>
          <div className="bg-white shadow-lg rounded-lg p-4"> {/* Added padding for spacing */}
            <Plot
              data={[{
                x: timestamps,
                y: temperatureData,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#1976d2', width: 2 },
                name: 'Temperature',
              },
              // Threshold lines
              {
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [tempWorstLow, tempWorstLow],
                type: 'scatter',
                mode: 'lines',
                line: { color: 'red', width: 2, dash: 'solid' },
                name: `Low Temp: ${tempWorstLow}℃`,
              },
              {
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [tempWorstHigh, tempWorstHigh],
                type: 'scatter',
                mode: 'lines',
                line: { color: 'red', width: 2, dash: 'solid' },
                name: `High Temp: ${tempWorstHigh}℃`,
              }]}
              layout={{
                width: 680, // Adjusted width
                height: 350,
                xaxis: {
                  title: 'Time',
                  showgrid: true,
                  zeroline: false,
                  linecolor: 'black',
                  linewidth: 1,
                  tickangle: -45, // Rotates the x-axis labels to prevent overlap
                },
                yaxis: {
                  title: 'Temperature (℃)',
                  showgrid: true,
                  range: [25, 40],
                  linecolor: 'black',
                  linewidth: 1,
                },
                margin: { t: 30, r: 30, l: 50, b: 80 }, // Increased bottom margin
                plot_bgcolor: '#f9fafb',
                paper_bgcolor: '#f9fafb',
              }}
              config={{ displaylogo: false, responsive: true }}
            />
          </div>
        </div>

        {/* Pie Chart for Temperature (occupying 1 column) */}
        <div className="pie-chart-section col-span-1">
          <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Temperature Threshold (%)</h2>
          <div className="bg-white shadow-lg rounded-lg p-4"> {/* Added padding for spacing */}
            <Plot
              data={[{
                values: [tempInThresholdPercentage, (100 - tempInThresholdPercentage).toFixed(2)],
                labels: ['Within Threshold', 'Outside Threshold'],
                type: 'pie',
                marker: {
                  colors: ['#1976d2', '#e57373'],
                },
              }]}
              layout={{
                width: 350, // Adjusted width
                height: 350,
                margin: { t: 40, r: 0, l: 0, b: 0 }, // Adjusted margins for better fit
                showlegend: true, // Show legend for clarity
                title: {
                  text: 'Temperature Threshold Distribution',
                  font: { size: 16 },
                  x: 0.5, // Center the title
                  xanchor: 'center', // Anchor the title at center
                },
                plot_bgcolor: 'transparent', // Remove plot background
                paper_bgcolor: 'transparent', // Remove paper background
              }}
              config={{ displaylogo: false, responsive: true }}
            />
          </div>
        </div>
      </div>

      {/* SpO2 Section */}
      <div className="chart-section mb-8 grid grid-cols-3 gap-4">
        {/* SpO2 Plot (occupying 2 columns) */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-green-600 text-center mb-4">SpO2 Plot (%)</h2>
          <div className="bg-white shadow-lg rounded-lg p-4"> {/* Added padding for spacing */}
            <Plot
              data={[{
                x: timestamps,
                y: spo2Data,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#34a853', width: 2 },
                name: 'SpO2',
              },
              {
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [spo2WorstLow, spo2WorstLow],
                type: 'scatter',
                mode: 'lines',
                line: { color: 'red', width: 2, dash: 'solid' },
                name: `Low SpO2: ${spo2WorstLow}%`,
              }]}
              layout={{
                width: 680, // Adjusted width
                height: 350,
                xaxis: {
                  title: 'Time',
                  showgrid: true,
                  zeroline: false,
                  linecolor: 'black',
                  linewidth: 1,
                  tickangle: -45,
                },
                yaxis: {
                  title: 'SpO2 (%)',
                  showgrid: true,
                  range: [85, 100],
                  linecolor: 'black',
                  linewidth: 1,
                },
                margin: { t: 30, r: 30, l: 50, b: 80 }, // Increased bottom margin
                plot_bgcolor: '#f9fafb',
                paper_bgcolor: '#f9fafb',
              }}
              config={{ displaylogo: false, responsive: true }}
            />
          </div>
        </div>

        {/* Pie Chart for SpO2 (occupying 1 column) */}
        <div className="pie-chart-section col-span-1">
          <h2 className="text-xl font-semibold text-green-600 text-center mb-4">SpO2 Threshold (%)</h2>
          <div className="bg-white shadow-lg rounded-lg p-4"> {/* Added padding for spacing */}
            <Plot
              data={[{
                values: [spo2InThresholdPercentage, (100 - spo2InThresholdPercentage).toFixed(2)],
                labels: ['Within Threshold', 'Outside Threshold'],
                type: 'pie',
                marker: {
                  colors: ['#34a853', '#e57373'],
                },
              }]}
              layout={{
                width: 350, // Adjusted width
                height: 350,
                margin: { t: 40, r: 0, l: 0, b: 0 },
                showlegend: true,
                title: {
                  text: 'SpO2 Threshold Distribution',
                  font: { size: 16 },
                  x: 0.5,
                  xanchor: 'center',
                },
                plot_bgcolor: 'transparent',
                paper_bgcolor: 'transparent',
              }}
              config={{ displaylogo: false, responsive: true }}
            />
          </div>
        </div>
      </div>

      {/* Heart Rate Section */}
      <div className="chart-section mb-8 grid grid-cols-3 gap-4">
        {/* Heart Rate Plot (occupying 2 columns) */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-orange-500 text-center mb-4">Heart Rate Plot (BPM)</h2>
          <div className="bg-white shadow-lg rounded-lg p-4"> {/* Added padding for spacing */}
            <Plot
              data={[{
                x: timestamps,
                y: heartRateData,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#ff9800', width: 2 },
                name: 'Heart Rate',
              },
              {
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [heartRateWorstLow, heartRateWorstLow],
                type: 'scatter',
                mode: 'lines',
                line: { color: 'red', width: 2, dash: 'solid' },
                name: `Low HR: ${heartRateWorstLow} BPM`,
              },
              {
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [heartRateWorstHigh, heartRateWorstHigh],
                type: 'scatter',
                mode: 'lines',
                line: { color: 'red', width: 2, dash: 'solid' },
                name: `High HR: ${heartRateWorstHigh} BPM`,
              }]}
              layout={{
                width: 680, // Adjusted width
                height: 350,
                xaxis: {
                  title: 'Time',
                  showgrid: true,
                  zeroline: false,
                  linecolor: 'black',
                  linewidth: 1,
                  tickangle: -45,
                },
                yaxis: {
                  title: 'Heart Rate (BPM)',
                  showgrid: true,
                  range: [50, 130],
                  linecolor: 'black',
                  linewidth: 1,
                },
                margin: { t: 30, r: 30, l: 50, b: 80 }, // Increased bottom margin
                plot_bgcolor: '#f9fafb',
                paper_bgcolor: '#f9fafb',
              }}
              config={{ displaylogo: false, responsive: true }}
            />
          </div>
        </div>

        {/* Pie Chart for Heart Rate (occupying 1 column) */}
        <div className="pie-chart-section col-span-1">
          <h2 className="text-xl font-semibold text-orange-500 text-center mb-4">Heart Rate Threshold (%)</h2>
          <div className="bg-white shadow-lg rounded-lg p-4"> {/* Added padding for spacing */}
            <Plot
              data={[{
                values: [heartRateInThresholdPercentage, (100 - heartRateInThresholdPercentage).toFixed(2)],
                labels: ['Within Threshold', 'Outside Threshold'],
                type: 'pie',
                marker: {
                  colors: ['#ff9800', '#e57373'],
                },
              }]}
              layout={{
                width: 350, // Adjusted width
                height: 350,
                margin: { t: 40, r: 0, l: 0, b: 0 },
                showlegend: true,
                title: {
                  text: 'Heart Rate Threshold Distribution',
                  font: { size: 16 },
                  x: 0.5,
                  xanchor: 'center',
                },
                plot_bgcolor: 'transparent',
                paper_bgcolor: 'transparent',
              }}
              config={{ displaylogo: false, responsive: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ploty;
