import React from 'react';

const TemperatureCard = ({ temperatureData, averageTemperature }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-36 flex justify-between items-center border-l-4 border-blue-500">
      <div>
        <h3 className="text-blue-500 font-semibold">Temperature</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">
          {temperatureData ? `${temperatureData} °C` : '--'}
        </p>
        {averageTemperature && (
          <p className="text-sm text-gray-500 mt-1">Avg: {averageTemperature} °C</p>
        )}
      </div>
      <div>
        <i className="fas fa-thermometer-three-quarters fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

export default TemperatureCard;
