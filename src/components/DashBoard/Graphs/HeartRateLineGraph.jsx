import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const HeartRatePlot = ({ heartRateData, timestamps, heartRateWorstLow, heartRateWorstHigh}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-red-600 text-center mb-4">Heart Rate Plot (BPM)</h2>
      <Plot
        data={[
          {
            x: timestamps,
            y: heartRateData,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#d32f2f', width: 2 },
            name: 'Heart Rate',
          },
          {
            x: [timestamps[0], timestamps[timestamps.length - 1]],
            y: [heartRateWorstLow, heartRateWorstLow],
            type: 'scatter',
            mode: 'lines',
            line: { color: 'red', width: 2, dash: 'solid' },
            name: `Low Heart Rate: ${heartRateWorstLow} BPM`,
          },
          {
            x: [timestamps[0], timestamps[timestamps.length - 1]],
            y: [heartRateWorstHigh, heartRateWorstHigh],
            type: 'scatter',
            mode: 'lines',
            line: { color: 'red', width: 2, dash: 'solid' },
            name: `High Heart Rate: ${heartRateWorstHigh} BPM`,
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
            title: 'Heart Rate (BPM)',
            showgrid: true,
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
HeartRatePlot.propTypes = {
  heartRateData: PropTypes.arrayOf(PropTypes.number).isRequired,
  timestamps: PropTypes.arrayOf(PropTypes.string).isRequired,
  heartRateWorstLow: PropTypes.number.isRequired,
  heartRateWorstHigh: PropTypes.number.isRequired,
  heartRateInThresholdPercentage: PropTypes.number.isRequired,
};

export default HeartRatePlot;
