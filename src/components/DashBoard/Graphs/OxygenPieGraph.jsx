// import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const SpO2PieChart = ({ spo2InThresholdPercentage }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-green-600 text-center mb-4">SpO2 Threshold (%)</h2>
      <Plot
        data={[
          {
            values: [spo2InThresholdPercentage, (100 - spo2InThresholdPercentage).toFixed(2)],
            labels: ['Within Threshold', 'Outside Threshold'],
            type: 'pie',
            marker: {
              colors: ['#34a853', '#e57373'],
            },
          },
        ]}
        layout={{
          width: 350,
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
  );
};

// Define prop types for validation
SpO2PieChart.propTypes = {
  spo2InThresholdPercentage: PropTypes.number.isRequired, // Required prop for SpO2 in threshold percentage
};

export default SpO2PieChart;
