import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FaRegChartBar className="brand-icon" />
          <span>EnviMon</span>
        </Link>

        <div
          className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/data" className="nav-link">
            Live Data
          </Link>
          <Link to="/visualization" className="nav-link">
            Analytics
          </Link>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
