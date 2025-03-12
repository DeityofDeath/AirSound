import React from 'react';
import './Navbar.css'; // Add your styling here

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Air & Sound Monitor</div>
      <ul className="navbar-links">
        <li><a href="">Home</a></li>
        <li><a href="https://thingspeak.com/channels/2655099">Data</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
