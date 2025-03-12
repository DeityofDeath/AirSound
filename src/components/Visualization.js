import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Visualization.css';

function Visualization({ data }) {
  return (
    <div className="visualization-container">
      <h2>Air Quality and Sound Levels</h2>
      
      <div className="chart-wrapper">
        <h3>Air Quality Over Time (ppm)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
            <YAxis />
            <Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString()} />
            <Legend />
            <Line type="monotone" dataKey="airQuality1" stroke="#8884d8" name="Air Quality" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrapper">
        <h3>Sound Levels Over Time (dB)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
            <YAxis />
            <Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString()} />
            <Legend />
            <Bar dataKey="db" fill="#82ca9d" name="Sound Level" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Visualization;
