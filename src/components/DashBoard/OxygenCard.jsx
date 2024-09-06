import React from 'react';

const OxygenCard = ({ oxygenData, averageOxygen }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-36 flex justify-between items-center border-l-4 border-[#1cc88a]">
      <div>
        <h3 className="text-[#1cc88a] font-semibold">Oxygen Level</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {oxygenData ? `${oxygenData} %` : '--'}
        </p>
        {averageOxygen && (
          <p className="text-sm text-gray-500 mt-1">Avg: {averageOxygen} %</p>
        )}
      </div>
      <div>
        <i className="fas fa-lungs fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

export default OxygenCard;
