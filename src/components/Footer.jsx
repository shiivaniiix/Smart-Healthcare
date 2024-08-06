// import React from 'react'
import './Footer.css'
import '../style.css'

const Footer = () => {
  return (
    <>
        <footer className="footer">
  <div className="footer-container">
    <nav className="footer-nav">
      <div>
        <h3 className="footer-title">Resources</h3>
        <ul>
          <li>
            <a className="footer-link" href="#">
              Blog
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              Community
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer-title">Company</h3>
        <ul>
          <li>
            <a className="footer-link" href="#">
              About
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              Our Mission
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              Our Team
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              Careers
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer-title">Contact Us</h3>
        <ul>
          <li>
            <a className="footer-link" href="#">
              Sales
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              Support
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div className="footer-newsletter" id="subscribe">
      <p>
        Stay up to date with all Health news by subscribing to our newsletter.
      </p>
      <form
        action="https://www.freecodecamp.com/email-submit"
        method="GET"
        id="form"
        className="footer-form"
      >
        <label htmlFor="email" className="visuallyhidden">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="footer-email"
          placeholder="Email Address"
          id="email"
          spellCheck="false"
          aria-required="true"
          aria-invalid="false"
        />
        <input
          type="submit"
          id="submit"
          className="button button-email"
          defaultValue="Subscribe"
        />
      </form>
    </div>
    <ul className="footer-social">
      <li>
        <a
          href="mailto:keshav.sethi004@gmail.com?Subject=Hi%20Keshav"
          rel="noopener noreferrer"
        >
          <svg
            width={23}
            height={18}
            viewBox="0 0 27 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <use xlinkHref="#contact-email-icon" />
          </svg>
          <span className="visuallyhidden">email</span>
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.538 4.66203C16.538 5.32484 16.0006 5.86203 15.338 5.86203C14.6753 5.86203 14.138 5.32484 14.138 4.66203C14.138 3.99922 14.6753 3.46203 15.338 3.46203C16.0008 3.46203 16.538 3.99922 16.538 4.66203ZM10 13.3333C8.15906 13.3333 6.66672 11.8409 6.66672 10C6.66672 8.15906 8.15906 6.66672 10 6.66672C11.8409 6.66672 13.3333 8.15906 13.3333 10C13.3333 11.8409 11.8409 13.3333 10 13.3333ZM10 4.86484C7.16391 4.86484 4.86484 7.16391 4.86484 10C4.86484 12.8361 7.16391 15.1352 10 15.1352C12.8361 15.1352 15.1352 12.8361 15.1352 10C15.1352 7.16391 12.8361 4.86484 10 4.86484ZM10 1.80187C12.6702 1.80187 12.9864 1.81203 14.0408 1.86016C15.0158 1.90469 15.5453 2.0675 15.8977 2.20453C16.3644 2.38594 16.6975 2.60266 17.0475 2.95266C17.3975 3.3025 17.6142 3.63563 17.7956 4.1025C17.9325 4.45484 18.0955 4.98437 18.14 5.95937C18.1881 7.01391 18.1983 7.33016 18.1983 10.0003C18.1983 12.6705 18.1881 12.9867 18.14 14.0411C18.0955 15.0161 17.9327 15.5456 17.7956 15.898C17.6142 16.3647 17.3975 16.6978 17.0475 17.0478C16.6977 17.3978 16.3645 17.6145 15.8977 17.7959C15.5453 17.9328 15.0158 18.0958 14.0408 18.1403C12.9864 18.1884 12.6702 18.1986 10 18.1986C7.32969 18.1986 7.01344 18.1884 5.95906 18.1403C4.98406 18.0958 4.45453 17.933 4.10219 17.7959C3.63547 17.6145 3.30234 17.3978 2.95234 17.0478C2.6025 16.698 2.38563 16.3648 2.20422 15.898C2.06734 15.5456 1.90437 15.0161 1.85984 14.0411C1.81172 12.9866 1.80156 12.6703 1.80156 10.0003C1.80156 7.33016 1.81172 7.01391 1.85984 5.95937C1.90437 4.98437 2.06719 4.45484 2.20422 4.1025C2.38563 3.63578 2.60234 3.30266 2.95234 2.95266C3.30219 2.60266 3.63531 2.38594 4.10219 2.20453C4.45453 2.06766 4.98406 1.90469 5.95906 1.86016C7.01359 1.81203 7.32984 1.80187 10 1.80187ZM10 0C7.28422 0 6.94359 0.0115625 5.87703 0.0601562C4.81266 0.10875 4.08562 0.277812 3.44969 0.525C2.79203 0.780469 2.23437 1.1225 1.67844 1.67844C1.1225 2.23437 0.780469 2.79203 0.525 3.44969C0.277812 4.08578 0.10875 4.81266 0.0601562 5.87703C0.0115625 6.94359 0 7.28422 0 10C0 12.7158 0.0115625 13.0564 0.0601562 14.123C0.10875 15.1873 0.277812 15.9142 0.525 16.5503C0.780469 17.208 1.1225 17.7656 1.67844 18.3216C2.23437 18.8775 2.79203 19.2194 3.44969 19.475C4.08578 19.7222 4.81266 19.8912 5.87703 19.9398C6.94359 19.9884 7.28422 20 10 20C12.7158 20 13.0564 19.9884 14.123 19.9398C15.1873 19.8912 15.9142 19.7222 16.5503 19.475C17.208 19.2194 17.7656 18.8775 18.3216 18.3216C18.8775 17.7656 19.2194 17.208 19.475 16.5503C19.7222 15.9142 19.8912 15.1873 19.9398 14.123C19.9884 13.0564 20 12.7158 20 10C20 7.28422 19.9884 6.94359 19.9398 5.87703C19.8912 4.81266 19.7222 4.08578 19.475 3.44969C19.2194 2.79203 18.8775 2.23437 18.3216 1.67844C17.7656 1.1225 17.208 0.780625 16.5503 0.525C15.9142 0.277812 15.1873 0.10875 14.123 0.0601562C13.0564 0.0115625 12.7158 0 10 0Z"
              fill="url(#paint0_radial)"
            />
            <defs>
              <radialGradient
                id="paint0_radial"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(2.98611 20.0694) scale(25.555)"
              >
                <stop offset={0} stopColor="#FFB140" />
                <stop offset="0.2559" stopColor="#FF5445" />
                <stop offset="0.599" stopColor="#FC2B82" />
                <stop offset={1} stopColor="#8E40B7" />
              </radialGradient>
            </defs>
          </svg>
          <span className="visuallyhidden">Instagram</span>
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/keshavsethi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width={20}
            height={16}
            viewBox="0 0 20 16"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use xlinkHref="#twitter-icon" />
          </svg>
          <span className="visuallyhidden">Twitter</span>
        </a>
      </li>
    </ul>
    <p className="copyright">
      Project made by{" "}
      <a
        className="dotted-link"
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Group 12
      </a>
      . View source on{" "}
      <a
        className="dotted-link"
        href="https://github.com/shiivaniiix/Smart-Healthcare.git"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </p>
  </div>
</footer>

    </>
  )
}

export default Footer