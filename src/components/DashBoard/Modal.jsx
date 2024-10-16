// src/components/Modal.js
// import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Modal = ({ isOpen, onClose, userDetails, avgValues, graphs }) => {
  if (!isOpen) return null;

  const handleDownloadGraphs = () => {
    graphs.forEach((graph, index) => {
      const imageData = graph.toDataURL(); // Get the PNG data URL of the graph
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `graph-${index + 1}.png`; // Set download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">User Report</h2>
        <div className="mb-4">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Start Time:</strong> {userDetails.startTime}</p> {/* Added Start Time */}
          <p><strong>End Time:</strong> {userDetails.endTime}</p> {/* Added End Time */}
          <p><strong>Average Temperature:</strong> {avgValues.avgTemperature} ℃</p>
          <p><strong>Average SpO2:</strong> {avgValues.avgSpO2} %</p>
          <p><strong>Average Heart Rate:</strong> {avgValues.avgHeartRate} BPM</p>
        </div>
        <button onClick={handleDownloadGraphs} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Download Graphs
        </button>
        <button onClick={onClose} className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
          Close
        </button>
      </div>
    </div>
  );
};

// Prop types validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired, // Added Start Time
    endTime: PropTypes.string.isRequired,   // Added End Time
  }).isRequired,
  avgValues: PropTypes.shape({
    avgTemperature: PropTypes.number.isRequired,
    avgSpO2: PropTypes.number.isRequired,
    avgHeartRate: PropTypes.number.isRequired,
  }).isRequired,
  graphs: PropTypes.arrayOf(PropTypes.instanceOf(HTMLCanvasElement)).isRequired, // Assuming graphs are canvas elements
};

export default Modal;
