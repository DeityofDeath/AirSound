import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { FiArrowLeft } from 'react-icons/fi';
import './VisualizationPage.css';

const GaugeMeter = ({ title, value, max, unit, color }) => {
  if (value === null || value === undefined) return <div className="gauge-loading">Loading...</div>;

  const gaugeData = [
    { name: 'Remaining', value: max - value, fill: '#e0e0e0' },
    { name: title, value: value, fill: color }
  ];

  const getStatus = () => {
    const percentage = (value / max) * 100;
    if (percentage <= 40) return 'Good';
    if (percentage <= 75) return 'Moderate';
    return 'Poor';
  };

  return (
    <div className="gauge-card">
      <div className="gauge-header">
        <h3 className="gauge-title">{title}</h3>
        <span className={`status-tag ${getStatus().toLowerCase()}`}>
          {getStatus()}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={gaugeData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
          <RadialBar background clockWise dataKey="value" cornerRadius={10} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="gauge-value"
          >
            {value} {unit}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="gauge-footer">
        <span className="gauge-range">0</span>
        <span className="gauge-range">{max} {unit}</span>
      </div>
    </div>
  );
};

function VisualizationPage({ sensorData }) => {
  const { location } = useParams();
  const navigate = useNavigate();
  const latestData = sensorData;

  return (
    <div className="visualization-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft className="back-icon" />
        Back to Dashboard
      </button>

      <div className="header-section">
        <h1 className="page-title">{location} Environmental Analytics</h1>
        <div className="status-overview">
          <div className="status-item">
            <span className="status-dot air-quality"></span>
            Air Quality
          </div>
          <div className="status-item">
            <span className="status-dot sound-level"></span>
            Sound Level
          </div>
        </div>
      </div>

      <div className="gauge-grid">
        {/* Air Quality Section */}
        <div className="metric-group">
          <h2 className="group-title">Air Quality Metrics</h2>
          <div className="group-grid">
            <GaugeMeter 
              title="Air Quality Index" 
              value={latestData?.airQuality1} 
              max={1000} 
              unit="ppm" 
              color="#4CAF50"
            />
            <GaugeMeter 
              title="CO₂ Level" 
              value={latestData?.co2level} 
              max={2500} 
              unit="ppm" 
              color="#FF9800"
            />
            <GaugeMeter 
              title="CO Level" 
              value={latestData?.colevel} 
              max={100} 
              unit="ppm" 
              color="#F44336"
            />
          </div>
        </div>

        {/* Sound & Other Metrics */}
        <div className="metric-group">
          <h2 className="group-title">Sound & Chemical Levels</h2>
          <div className="group-grid">
            <GaugeMeter 
              title="Sound Level" 
              value={latestData?.soundLevel1} 
              max={120} 
              unit="dB" 
              color="#2196F3"
            />
            <GaugeMeter 
              title="NH₄ Level" 
              value={latestData?.nh4level} 
              max={50} 
              unit="ppm" 
              color="#9C27B0"
            />
            <GaugeMeter 
              title="Toulene Level" 
              value={latestData?.toulenelevel} 
              max={50} 
              unit="ppm" 
              color="#009688"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage;