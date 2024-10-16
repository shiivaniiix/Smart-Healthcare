// import React from 'react';
import PropTypes from 'prop-types';

const HeartRateCard = ({ averageHeartRate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-36 flex justify-between items-center border-l-4 border-[#36b9cc]">
      <div>
        <h3 className="text-[#36b9cc] font-semibold">Average Heart Rate</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {averageHeartRate ? `${averageHeartRate} BPM` : '0'}
        </p>
      </div>
      <div>
        <i className="fas fa-heartbeat fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

// Prop validation
HeartRateCard.propTypes = {
  averageHeartRate: PropTypes.number,
};

export default HeartRateCard;
