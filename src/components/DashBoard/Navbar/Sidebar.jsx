// import React from 'react'

const Sidebar = () => {
  return (
    <>
        <ul
  style={{ top: "0 !important", position: "sticky", zIndex: 100 }}
  className="navbar-nav bg-gradient-primary toggled sidebar h-100 sidebar-dark accordion"
  id="accordionSidebar"
>
  <a
    className="sidebar-brand d-flex align-items-center justify-content-center"
    href="dashboard.html"
  >
    <div className="sidebar-brand-icon rotate-n-15">
      <i className="fas fa-ambulance" />
    </div>
    <div className="sidebar-brand-text mx-3">
      Health <sup>IoT</sup>
    </div>
  </a>
  {/* Divider */}
  <hr className="sidebar-divider my-0" />
  {/* Nav Item - Dashboard */}
  <li className="nav-item">
    <a className="nav-link" href="dashboard.html">
      <i className="fas fa-fw fa-tachometer-alt" />
      <span>Dashboard</span>
    </a>
  </li>
  {/* Divider */}
  <hr className="sidebar-divider" />
  {/* Heading */}
  <div className="sidebar-heading">Data</div>
  {/* Nav Item - Pages Collapse Menu */}
  <li className="nav-item">
    <a
      className="nav-link collapsed"
      href="#"
      data-toggle="collapse"
      data-target="#collapseTwo"
      aria-expanded="true"
      aria-controls="collapseTwo"
    >
      <i className="fas fa-fw fa-cog" />
      <span>Information</span>
    </a>
    <div
      id="collapseTwo"
      className="collapse"
      aria-labelledby="headingTwo"
      data-parent="#accordionSidebar"
    >
      <div className="bg-white py-2 collapse-inner rounded">
        <h6 className="collapse-header">Database Statistic:</h6>
        <a className="collapse-item" href="cards.html">
          Methodology
        </a>
      </div>
    </div>
  </li>
  {/* Divider */}
  <hr className="sidebar-divider" />
  {/* Heading */}
  <div className="sidebar-heading">More</div>
  {/* Nav Item - Pages Collapse Menu */}
  <li className="nav-item">
    <a
      className="nav-link collapsed"
      href="#"
      data-toggle="collapse"
      data-target="#collapsePages"
      aria-expanded="true"
      aria-controls="collapsePages"
    >
      <i className="fas fa-fw fa-folder" />
      <span>New User</span>
    </a>
    <div
      id="collapsePages"
      className="collapse"
      aria-labelledby="headingPages"
      data-parent="#accordionSidebar"
    >
      <div className="bg-white py-2 collapse-inner rounded">
        <h6 className="collapse-header">Login or Register</h6>
        <a className="collapse-item" href="login.html">
          Login
        </a>
        <a className="collapse-item" href="register.html">
          Register
        </a>
        <a className="collapse-item" href="forgot-password.html">
          Forgot Password
        </a>
      </div>
    </div>
  </li>
  {/* Nav Item - Tables */}
  <li className="nav-item active">
    <a className="nav-link" href="tables.html">
      <i className="fas fa-fw fa-table" />
      <span>Data Tables</span>
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="demo/chatbot.html">
      <i className="fas fa-fw fa-table" />
      <span>Chat Bot </span>
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="./alert.html">
      <i className="fas fa-fw fa-table" />
      <span>Alert! </span>
    </a>
  </li>
  {/* Divider */}
  <hr className="sidebar-divider d-none d-md-block" />
  {/* Sidebar Toggler (Sidebar) */}
  <div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" id="sidebarToggle" />
  </div>
</ul>
    </>
  )
}

export default Sidebar