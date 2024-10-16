// src/components/Graphs/TemperaturePieChart.jsx
// import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types'; // Import PropTypes

const TemperaturePieChart = ({ tempInThresholdPercentage }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Temperature Threshold (%)</h2>
      <Plot
        data={[
          {
            values: [tempInThresholdPercentage, (100 - tempInThresholdPercentage).toFixed(2)],
            labels: ['Within Threshold', 'Outside Threshold'],
            type: 'pie',
            marker: {
              colors: ['#1976d2', '#e57373'],
            },
          },
        ]}
        layout={{
          width: 350,
          height: 350,
          margin: { t: 40, r: 0, l: 0, b: 0 },
          showlegend: true,
          title: {
            text: 'Temperature Threshold Distribution',
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
  );
};

// Define prop types for validation
TemperaturePieChart.propTypes = {
  tempInThresholdPercentage: PropTypes.number.isRequired, // Required number for temperature within threshold percentage
};

export default TemperaturePieChart;
