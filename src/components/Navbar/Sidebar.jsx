// import React from 'react'
import { useState } from "react"
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Sidebar.css"

function Sidebar() {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill"},
    { title: "Inbox", src: "Chat"},
    { title: "Accounts", src: "User", gap: true},
    { title: "Schedule", src: "Calendar"},
    { title: "Search", src: "Search"},
    { title: "Files", src: "Folder", gap: true},
    { title: "Setting", src: "Setting"},
  ]
  return (
    <div className={`${open? 'w-64' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-[#4e73df] relative`}>
      <img src="/src/assets/control.png" className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-[#4e73df] ${!open && "rotate-180"}`}
      onClick={()=> setOpen(!open)}
      />
    <div className={`filter invert cursor-pointer duration-500 flex gap-x-4 items-center`}>
      <i className={`fas fa-ambulance text-4xl mr-3 ${open && "rotate-[360]"}`}style={{ transform: 'rotate(-15deg)' }}></i>
      <h1 className={`text-black origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`} >Health <sup>IoT</sup></h1>
    </div>
    <ul className="pt-6">
      {Menus.map((menu,index)=>(
        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-300 rounded-xl ${menu.gap ? "mt-9" :" mt-2"}`}>
          <img src={`./src/assets/${menu.src}.png`} alt="" />
          <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default Sidebar