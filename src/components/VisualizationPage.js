import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { FiArrowLeft } from "react-icons/fi";
import "./VisualizationPage.css";

const GaugeMeter = ({ title, value, max, min = 0, unit, color }) => {
  if (value === null || value === undefined)
    return (
      <div className="gauge-loading">
        <div className="loading-spinner"></div>
        <span>Connecting sensor...</span>
      </div>
    );

  const gaugeData = [
    { name: "Remaining", value: max - value, fill: "#f0f3f5" },
    { name: title, value: value, fill: color },
  ];

  const getStatus = () => {
    const percentage = (value / max) * 100;
    if (percentage <= 40) return { label: "Optimal", color: "#2ecc71" };
    if (percentage <= 75) return { label: "Moderate", color: "#f1c40f" };
    return { label: "Critical", color: "#e74c3c" };
  };

  const status = getStatus();

  return (
    <div className="gauge-card">
      <div className="gauge-header">
        <h3 className="gauge-title">{title}</h3>
        <div
          className="status-indicator"
          style={{ backgroundColor: status.color }}
        >
          {status.label}
        </div>
      </div>

      <div className="gauge-visual">
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            innerRadius="20%"
            outerRadius="90%"
            data={gaugeData}
            startAngle={90}
            endAngle={-270}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, max]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: "#f0f3f5" }}
              clockWise
              dataKey="value"
              cornerRadius={8}
              isAnimationActive={true}
              animationDuration={800}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="gauge-center">
          <span className="current-value">{value}</span>
          <span className="value-unit">{unit}</span>
        </div>
      </div>

      <div className="gauge-range-container">
        <div className="range-item">
          <span className="range-label">Min</span>
          <span className="range-value">{min}</span>
        </div>
        <div className="range-item">
          <span className="range-label">Max</span>
          <span className="range-value">{max}</span>
        </div>
      </div>
    </div>
  );
};

function VisualizationPage({ sensorData }) {
  const { location } = useParams();
  const navigate = useNavigate();

  return (
    <div className="visualization-page">
      <header className="analysis-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft className="back-icon" />
          <span className="back-label">Return to Dashboard</span>
        </button>
        <div className="header-content">
          <h1 className="page-title">
            <span className="location-tag">📍 {location}</span>
            Environmental Analysis Dashboard
          </h1>
          <div className="last-updated">
            Last updated:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="metric-section air-quality">
          <h2 className="section-title">Air Quality Metrics</h2>
          <div className="gauges-container">
            <GaugeMeter
              title="Air Quality Index"
              value={sensorData?.airQuality1}
              max={2000}
              min={130}
              unit="ppm"
              color="#4CAF50"
            />
            <GaugeMeter
              title="CO₂ Level"
              value={sensorData?.co2level}
              max={2000}
              min={130}
              unit="ppm"
              color="#FF9800"
            />
            <GaugeMeter
              title="CO Level"
              value={sensorData?.colevel}
              max={1000}
              // min = {130}
              unit="ppm"
              color="#F44336"
            />
          </div>
        </section>

        <section className="metric-section sound-chemical">
          <h2 className="section-title">Sound & Chemical Levels</h2>
          <div className="gauges-container">
            <GaugeMeter
              title="Sound Level"
              value={sensorData?.soundLevel1}
              max={140}
              min={20}
              unit="dB"
              color="#2196F3"
            />
            <GaugeMeter
              title="NH₄ Level"
              value={sensorData?.nh4level}
              max={1000}
              // min = {130}
              unit="ppm"
              color="#9C27B0"
            />
            <GaugeMeter
              title="Toluene Level"
              value={sensorData?.toulenelevel}
              max={2000}
              // min = {130}
              unit="ppm"
              color="#009688"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default VisualizationPage;
