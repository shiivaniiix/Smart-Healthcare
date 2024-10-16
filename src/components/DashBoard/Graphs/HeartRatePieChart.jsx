// import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const HeartRatePieChart = ({ heartRateInThresholdPercentage }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-red-600 text-center mb-4">Heart Rate Threshold (%)</h2>
      <Plot
        data={[
          {
            values: [heartRateInThresholdPercentage, (100 - heartRateInThresholdPercentage).toFixed(2)],
            labels: ['Within Threshold', 'Outside Threshold'],
            type: 'pie',
            marker: {
              colors: ['#d32f2f', '#e57373'],
            },
          },
        ]}
        layout={{
          width: 350,
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
  );
};

// Define prop types for validation
HeartRatePieChart.propTypes = {
  heartRateInThresholdPercentage: PropTypes.number.isRequired, // Percentage of heart rate readings within the threshold
};

export default HeartRatePieChart;
