import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Air & Sound Monitoring. All rights reserved.</p>
        <div className="footer-links">
          <a href="">Home</a>
          <a href="https://thingspeak.com/channels/2655099">Data</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
