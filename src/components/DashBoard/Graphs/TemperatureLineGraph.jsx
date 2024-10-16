import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const TemperatureLineChart = ({ timestamps, temperatureData, tempWorstLow, tempWorstHigh }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Temperature Plot (℃)</h2>
      <Plot
        data={[
          {
            x: timestamps,
            y: temperatureData,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#1976d2', width: 2 },
            name: 'Temperature',
          },
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
          },
        ]}
        layout={{
          width: 680,
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
            title: 'Temperature (℃)',
            showgrid: true,
            range: [25, 40],
            linecolor: 'black',
            linewidth: 1,
          },
          margin: { t: 30, r: 30, l: 50, b: 80 },
          plot_bgcolor: '#f9fafb',
          paper_bgcolor: '#f9fafb',
        }}
        config={{ displaylogo: false, responsive: true }}
      />
    </div>
  );
};

// Define prop types for validation
TemperatureLineChart.propTypes = {
  timestamps: PropTypes.arrayOf(PropTypes.string).isRequired, // Required array of timestamps
  temperatureData: PropTypes.arrayOf(PropTypes.number).isRequired, // Required array of temperature data
  tempWorstLow: PropTypes.number.isRequired, // Required number for lowest temperature threshold
  tempWorstHigh: PropTypes.number.isRequired, // Required number for highest temperature threshold
};

export default TemperatureLineChart;
