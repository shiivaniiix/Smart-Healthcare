// import React from 'react'
import Sidebar from './../Navbar/Sidebar.jsx'
import Homepage from './Homepage.jsx'

const Dashboard = () => {
  return (
    <>
    <div className="flex">
        <Sidebar />
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          <Homepage />
        </div>
    </div>
    </>
  )
}

export default Dashboard