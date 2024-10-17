// import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Sidebar.css";
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from "react-router-dom"; // Import Link

function Sidebar({ isOpen, onToggle }) {
  // Define menu items with their respective routes
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", path: "/dashboard" },
    { title: "Home", src: "Chat", path: "/homepage" },
    { title: "Saline level detection", src: "User", gap: true, path: "/accounts" },
    { title: "Schedule", src: "Calendar", path: "/schedule" },
    { title: "Search", src: "Search", path: "/search" },
    { title: "Files", src: "Folder", gap: true, path: "/files" },
    { title: "Setting", src: "Setting", path: "/settings" },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-[#4e73df] fixed`}>
      <img
        src="/src/assets/control.png"
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-[#4e73df] ${!isOpen && "rotate-180"}`}
        onClick={onToggle} // Use the passed toggle function
      />
      <div className={`filter invert cursor-pointer duration-500 flex gap-x-4 items-center`}>
        <i className={`fas fa-ambulance text-4xl mr-3 ${isOpen && "rotate-[360]"}`} style={{ transform: 'rotate(-15deg)' }}></i>
        <h1 className={`text-black origin-left font-medium text-xl duration-300 ${!isOpen && 'scale-0'}`}>Health <sup>IoT</sup></h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-300 rounded-xl ${menu.gap ? "mt-9" : "mt-2"}`}>
            <Link to={menu.path} className="flex items-center gap-x-4 w-full">
              <img src={`./src/assets/${menu.src}.png`} alt="" />
              <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define prop types for the Sidebar component
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,   // isOpen should be a boolean
  onToggle: PropTypes.func.isRequired,  // onToggle should be a function
};

export default Sidebar;
