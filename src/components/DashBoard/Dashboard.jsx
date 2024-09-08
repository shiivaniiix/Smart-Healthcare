// import React from 'react'
import Sidebar from './../Navbar/Sidebar.jsx'
import Homepage from './Homepage.jsx'

const Dashboard = (props) => {
  return (
    <>
    <div className="flex mt-0 pt-0 ">
        <Sidebar />
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          <Homepage name={props.name}/>
        </div>
    </div>
    </>
  )
}

export default Dashboard