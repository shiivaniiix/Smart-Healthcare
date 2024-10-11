// import React from 'react';
import PropTypes from 'prop-types';

const OxygenCard = ({ averageOxygen }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-36 flex justify-between items-center border-l-4 border-[#1cc88a]">
      <div>
        <h3 className="text-[#1cc88a] font-semibold">Average Oxygen Level</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {averageOxygen ? `${averageOxygen} %` : '--'}
        </p>
      </div>
      <div>
        <i className="fas fa-lungs fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

// Prop validation
OxygenCard.propTypes = {
  averageOxygen: PropTypes.number,
};

export default OxygenCard;
