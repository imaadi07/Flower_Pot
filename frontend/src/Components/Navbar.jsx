import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-text">PAINTS</span>
          <span className="logo-leaf"></span>
        </div>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        <div
          className={`nav-links ${isMenuOpen ? "open" : ""}`}
          role="navigation"
        >
          <ul className="items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
