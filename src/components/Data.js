import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloud, FaVolumeUp, FaInfoCircle } from 'react-icons/fa';
import './Data.css';

function Data({ sensorData }) {
  const getStatusColor = (value, thresholds) => {
    if (value <= thresholds.good) return '#2ecc71';
    if (value <= thresholds.moderate) return '#f1c40f';
    return '#e74c3c';
  };

  return (
    <div id="data" className="data-container">
      <h2 className="data-page-title">Real-Time Environmental Data</h2>
      
      <div className="data-grid">
        {/* Location 1 Card */}
        <div className="data-card">
          <div className="card-header">
            <div className="station-header">
              <h3 className="location-title">
                <span className="location-icon">📍</span>
                Monitoring Station #1
              </h3>
              <div className="online-status">
                <div className="status-dot online"></div>
                <span>Live</span>
              </div>
            </div>
            <div className="status-indicators">
              <div className="status-item">
                <FaCloud className="status-icon" />
                <span className="status-label">Air Quality</span>
              </div>
              <div className="status-item">
                <FaVolumeUp className="status-icon" />
                <span className="status-label">Sound Level</span>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="metric">
              <div className="metric-header">
                <span className="metric-title">Air Quality</span>
                <div className="metric-status" style={{ 
                  backgroundColor: getStatusColor(sensorData.airQuality1, { good: 400, moderate: 750 })
                }} />
              </div>
              <div className="metric-value">
                {sensorData.airQuality1 ?? '--'}
                <span className="metric-unit">ppm</span>
              </div>
            </div>

            <div className="metric">
              <div className="metric-header">
                <span className="metric-title">Sound Level</span>
                <div className="metric-status" style={{ 
                  backgroundColor: getStatusColor(sensorData.soundLevel1, { good: 50, moderate: 80 })
                }} />
              </div>
              <div className="metric-value">
                {sensorData.soundLevel1 ?? '--'}
                <span className="metric-unit">dB</span>
              </div>
            </div>

            <Link to="/visualization/Location1" className="analysis-button">
              <FaInfoCircle className="button-icon" />
              Detailed Analysis
            </Link>
          </div>
        </div>

        {/* Location 2 Card */}
        <div className="data-card offline">
          <div className="card-header">
            <div className="station-header">
              <h3 className="location-title">
                <span className="location-icon">📍</span>
                Monitoring Station #2
              </h3>
              <div className="online-status">
                <div className="status-dot offline"></div>
                <span>Offline</span>
              </div>
            </div>
            <div className="status-indicators">
              <div className="status-item">
                <FaCloud className="status-icon" />
                <span className="status-label">Air Quality</span>
              </div>
              <div className="status-item">
                <FaVolumeUp className="status-icon" />
                <span className="status-label">Sound Level</span>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="metric">
              <div className="metric-header">
                <span className="metric-title">Air Quality</span>
                <div className="metric-status offline" />
              </div>
              <div className="metric-value">
                {sensorData.airQuality2 ?? '--'}
                <span className="metric-unit">ppm</span>
              </div>
            </div>

            <div className="metric">
              <div className="metric-header">
                <span className="metric-title">Sound Level</span>
                <div className="metric-status offline" />
              </div>
              <div className="metric-value">
                {sensorData.soundLevel2 ?? '--'}
                <span className="metric-unit">dB</span>
              </div>
            </div>

            <div className="offline-overlay">
              <span className="offline-text">Station Offline</span>
            </div>
            
            <button className="analysis-button disabled" disabled>
              <FaInfoCircle className="button-icon" />
              Connect for Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;