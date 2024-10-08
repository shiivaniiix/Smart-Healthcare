import './Topbar.css'
import { Link } from 'react-router-dom'// Import Link from React Router

const Topbar = () => {
  return (
    <>
      <header id="header" className="header">
        <img
          src="favicon.ico"
          style={{ height: "8vh", paddingLeft: "5vh" }}
          className="logo"
          alt="Learn English"
          id="header-img"
        />
        <nav id="nav-bar" className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#how-it-works">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#get-started">
                Get Started
              </a>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link nav-link-cta" 
                to={{
                  pathname: "/dashboard",
                }}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <span className="visuallyhidden">Menu</span>
          <span className="hamburger" />
        </button>
      </header>
    </>
  )
}

export default Topbar
