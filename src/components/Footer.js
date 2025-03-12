import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaGithub,
  FaLinkedin,
  FaRegEnvelope,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">
            <span className="footer-logo">Enviro</span>Monitor
          </h3>
          <p className="footer-description">
            Real-time environmental monitoring system providing actionable
            insights for healthier communities.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/data" className="footer-link">
                <FaChartLine /> Live Data
              </Link>
            </li>
            <li>
              <a
                href="https://thingspeak.mathworks.com/channels/2655099"
                className="footer-link"
              >
                <FaChartLine /> ThingSpeak
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Connect</h4>
          <div className="social-links">
            <a href="https://github.com/DeityofDeath" className="social-link">
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/rikhil-rao-janagama-047972284/"
              className="social-link"
            >
              <FaLinkedin />
            </a>
            <a href="rikhilraoj@gmail.com" className="social-link">
              <FaRegEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 EnviroMonitor. All rights reserved.</p>
        <p>Made with ♥ for a cleaner environment</p>
      </div>
    </footer>
  );
}

export default Footer;
