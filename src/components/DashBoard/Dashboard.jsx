import PropTypes from 'prop-types';
import Sidebar from './../Navbar/Sidebar.jsx';
import Homepage from './Homepage.jsx';
import { useState } from 'react';
import Footer from '../Footer.jsx';

const Dashboard = (props) => {
  // State to track sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex">
        {/* Pass the toggle state and function to Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

        {/* Main content area with dynamic padding based on sidebar width */}
        <div className={` transition-all duration-300 ${isSidebarOpen ? 'pl-72' : 'pl-28'}`}>
          <Homepage name={props.name} />
          <Footer />
        </div>
      </div>
    </>
  );
};

// Define the expected prop types for the Dashboard component
Dashboard.propTypes = {
  name: PropTypes.string.isRequired, // Expecting a string that is required
};

export default Dashboard;
