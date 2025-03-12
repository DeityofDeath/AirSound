import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import './Visualization.css';

function GaugeMeter({ title, value, max, unit, color }) {
  if (value === null || value === undefined) return <div className="meter-container">Loading...</div>;

  const gaugeData = [
    { name: 'Remaining', value: max - value, fill: '#e0e0e0' },
    { name: title, value: value, fill: color }
  ];

  return (
    <div className="meter-container">
      <h3 className="gauge-title">{title}</h3>
      <RadialBarChart
        width={280}
        height={280}
        cx={140}
        cy={140}
        innerRadius={90}
        outerRadius={110}
        barSize={20}
        startAngle={90}
        endAngle={-270}
        data={gaugeData}
      >
        <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
        <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#e0e0e0' }} />
        <text
          x={140}
          y={140}
          textAnchor="middle"
          dominantBaseline="middle"
          className="gauge-value"
        >
          {value} {unit}
        </text>
      </RadialBarChart>
    </div>
  );
}

function Visualization({ sensorData }) {
  const navigate = useNavigate();

  return (
    <div className="visualization-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Data
      </button>
      
      <h1 className="dashboard-title">Environmental Quality Dashboard</h1>
      
      <div className="gauges-grid">
        <GaugeMeter 
          title="Air Quality 1" 
          value={sensorData.airQuality1} 
          max={2000} 
          unit="ppm" 
          color="#4CAF50"
        />
        <GaugeMeter 
          title="Sound Level 1" 
          value={sensorData.soundLevel1} 
          max={140} 
          unit="dB" 
          color="#2196F3"
        />
        <GaugeMeter 
          title="Air Quality 2" 
          value={sensorData.airQuality2} 
          max={2000} 
          unit="ppm" 
          color="#4CAF50"
        />
        <GaugeMeter 
          title="Sound Level 2" 
          value={sensorData.soundLevel2} 
          max={140} 
          unit="dB" 
          color="#2196F3"
        />
        <GaugeMeter 
          title="CO₂" 
          value={sensorData.co2level} 
          max={2500} 
          unit="ppm" 
          color="#FF9800"
        />
        <GaugeMeter 
          title="CO" 
          value={sensorData.colevel} 
          max={100} 
          unit="ppm" 
          color="#F44336"
        />
      </div>
    </div>
  );
}

export default Visualization;