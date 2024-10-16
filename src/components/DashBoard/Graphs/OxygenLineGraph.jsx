// import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const SpO2LineChart = ({ timestamps, spo2Data, spo2WorstLow }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-600 text-center mb-4">SpO2 Plot (%)</h2>
          <Plot
            data={[
              {
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
                title: 'SpO2 (%)',
                showgrid: true,
                range: [80, 100],
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
SpO2LineChart.propTypes = {
  timestamps: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of timestamps for the x-axis
  spo2Data: PropTypes.arrayOf(PropTypes.number).isRequired, // Array of SpO2 data values
  spo2WorstLow: PropTypes.number.isRequired, // The lowest SpO2 value to display
};

export default SpO2LineChart;
