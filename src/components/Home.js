import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaLeaf, FaBroadcastTower } from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <div id="home" className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">Air</span> & 
            <span className="highlight"> Sound</span> Monitoring
          </h1>
          <p className="hero-subtitle">Real-time environmental quality tracking for a healthier tomorrow</p>
          <Link to="/data" className="cta-button">
            View Live Data <FaChartLine className="cta-icon" />
          </Link>
        </div>
      </div>

      <div className="features-container">
        <div className="feature-card">
          <FaLeaf className="feature-icon" />
          <h3>Air Quality Analysis</h3>
          <p>Monitor particulate matter and harmful gases in real-time</p>
        </div>
        
        <div className="feature-card">
          <FaBroadcastTower className="feature-icon" />
          <h3>Noise Level Tracking</h3>
          <p>Continuous sound monitoring with instant alerts</p>
        </div>
      </div>
    </div>
  );
}

export default Home;