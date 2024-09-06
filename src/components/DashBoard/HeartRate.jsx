import React from 'react';

const HeartRateCard = ({ heartRateData, averageHeartRate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-36 flex justify-between items-center border-l-4 border-[#36b9cc]">
      <div>
        <h3 className="text-[#36b9cc] font-semibold">Heart Rate</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {heartRateData ? `${heartRateData} BPM` : '--'}
        </p>
        {averageHeartRate && (
          <p className="text-sm text-gray-500 mt-1">Avg: {averageHeartRate} BPM</p>
        )}
      </div>
      <div>
        <i className="fas fa-heartbeat fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

export default HeartRateCard;
