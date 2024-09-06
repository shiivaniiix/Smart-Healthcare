import { useState } from 'react';


const GroupCard = () => {
  // State to control the modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Group Card */}
      <div 
        className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center border-l-4 border-yellow-400 cursor-pointer h-[100%]"
        onClick={toggleModal} // Opens the modal when card is clicked
      >
        <div>
          <h3 className="text-yellow-500 font-medium text-lg">GROUP (CLICK FOR DETAILS)</h3>
          <p className="text-md font-semibold text-base text-gray-700">Group:-12</p>
        </div>
        <div className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-16 w-16"
          >
            <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-2.67 0-8 1.339-8 4v2h16v-2c0-2.661-5.33-4-8-4zm9 3.5c0-.519-.063-1.02-.173-1.5h-1.827c.07.319.123.649.155 1h-1.484c.11-.449.176-.924.176-1.417 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .493.066.968.176 1.417h-1.484c.032-.351.085-.681.155-1h-1.827c-.11.48-.173.981-.173 1.5 0 2.67 5.33 4 8 4s8-1.33 8-4zm-6-4.5c.554 0 1 .446 1 1s-.446 1-1 1-1-.446-1-1 .446-1 1-1z" />
          </svg>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Group 12 (Health Care IoT)</h3>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-5">
              <ul className="text-gray-600 text-2xl">
                <li>Shivani Srivastava </li>
                <li>Roshan Gupta </li>
                <li>Soham Rayware </li>
              </ul>
            </div>
            <div className="flex justify-end p-3 border-t">
              <button
                onClick={toggleModal}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-3 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
