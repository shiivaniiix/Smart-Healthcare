import { Link } from 'react-router-dom';
import Sidebar from '../Navbar/Sidebar';
import { useState } from 'react';
// import { db } from './path-to-your-firebase-file'; // Adjust the path to your Firebase file
// import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase'; // Import necessary functions
import { collection, query, where, getDoc } from 'firebase/firestore';


const Accounts = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} onToggle={toggle} />
      <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <header className='flex justify-between bg-white p-6 shadow-lg rounded-lg '>
          <button onClick={toggle} className="text-gray-600 focus:outline-none md:hidden">
            <i className={`fas fa-${isOpen ? 'times' : 'bars'} text-2xl`}></i> {/* Toggle Button */}
          </button>
          <h1 className="text-center text-lg font-semibold">Welcome to Account Section</h1>
          <nav>
            <ul className='flex space-x-14'>
              <li className='text-lg'>
                <Link 
                  to={{ pathname: "/homepage" }} 
                  className="text-[#33335a] hover:text-[#0000ff] transition duration-300"
                >
                  Homepage
                </Link>
              </li>
              <li className='text-lg'>
                <Link 
                  to={{ pathname: "/dashboard" }} 
                  className="text-[#33335a] hover:text-[#0000ff] transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </main>
    </div>
  );
}

export default Accounts;
