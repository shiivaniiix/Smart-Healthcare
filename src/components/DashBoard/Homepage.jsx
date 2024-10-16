import PropTypes from 'prop-types';
import Ploty from './Ploty'; // Ensure this matches the filename exactly


const Homepage = (props) => {
  return (
    <>
      <div className="bg-[#f8f9fc] pr-4 pt-4">
        <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-lg w-full">
          {/* Search Input */}
          <div className="flex flex-grow items-center bg-white rounded-md px-2 w-4">
            <h1 className='font-bold '>Welcome to Our Dashboard</h1>
          </div>

          {/* User Avatar */}
          <div className="flex ml-10">
            <h1 className="mr-3 text-lg font-normal p-3">
              {props.name ? ` ${props.name}` : "User"}
            </h1>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        <h1 className="mt-5 text-gray-600 text-2xl font-normal">Dashboard</h1>
        {/* <div className="grid grid-cols-4 gap-8 pr-4">
          <TemperatureCard />
          <OxygenCard />
          <HeartRateCard />
          <GroupCard />
        </div> */}
        <div className='pt-0'>
          <Ploty />
        </div>
      </div>
    </>
  );
};

// Define the expected prop types for the Homepage component
Homepage.propTypes = {
  name: PropTypes.string, // Expecting a string but it's not required
};

export default Homepage;
