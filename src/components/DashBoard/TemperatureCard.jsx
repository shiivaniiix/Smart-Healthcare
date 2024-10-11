// import React from 'react';
import PropTypes from 'prop-types';

const TemperatureCard = ({ averageTemperature }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-36 flex justify-between items-center border-l-4 border-[#1cc88a]">
      <div>
        <h3 className="text-[#1cc88a] font-semibold">Average Temperature</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {averageTemperature ? `${averageTemperature} ℃` : '--'}
        </p>
      </div>
      <div>
        <i className="fas fa-thermometer-half fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

// Prop validation
TemperatureCard.propTypes = {
  averageTemperature: PropTypes.number,
};

export default TemperatureCard;
