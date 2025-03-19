import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiCpu, FiCloud, FiWifi, FiActivity, FiExternalLink } from 'react-icons/fi';
import './Visualization.css';

const IoTVisualization = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainResponse, dhtResponse] = await Promise.all([
          fetch(`https://api.thingspeak.com/channels/2655099/feeds.json?api_key=W0PXCZ4NR26GAAGC&results=50`),
          fetch(`https://api.thingspeak.com/channels/2522853/feeds.json?api_key=W0PXCZ4NR26GAAGC&results=50`)
        ]);

        if (!mainResponse.ok || !dhtResponse.ok) throw new Error('Failed to fetch data');

        const mainResult = await mainResponse.json();
        const dhtResult = await dhtResponse.json();

        const combinedData = mainResult.feeds.map((feed, index) => ({
          created_at: new Date(feed.created_at).toLocaleTimeString(),
          airQuality: feed.field1,
          soundLevel: feed.field2,
          temperature: dhtResult.feeds[index]?.field2,
          humidity: dhtResult.feeds[index]?.field1
        }));

        setData(combinedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const WorkflowDiagram = () => (
    <div className="workflow-container">
      <h2 className="section-title">System Workflow Architecture</h2>
      <div className="workflow-steps">
        {[
          {
            icon: <FiActivity />,
            title: 'Sensor Data Collection',
            details: ['MQ135 Gas Sensor', 'KY-038 Sound Sensor', 'DHT11 (Temp/Humidity)'],
          },
          {
            icon: <FiCpu />,
            title: 'Microcontroller Processing',
            details: ['ESP32 processes signals', 'WiFi transmission'],
          },
          {
            icon: <FiCloud />,
            title: 'Cloud Analytics',
            details: ['ThingSpeak storage', 'MATLAB processing'],
          },
          {
            icon: <FiWifi />,
            title: 'Data Visualization',
            details: ['LCD Display', 'Web Dashboard'],
          },
        ].map((step, index) => (
          <div className="workflow-step card" key={index}>
            <div className="step-icon gradient-bg">{step.icon}</div>
            <h4 className="step-title">{step.title}</h4>
            <ul className="step-details">
              {step.details.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="time">{label}</p>
          <div className="data-points">
            {payload.map((entry, index) => (
              <div key={index} className="data-item" style={{ color: entry.color }}>
                {entry.name}: {entry.value}
                <span className="unit">
                  {entry.dataKey === 'airQuality' ? 'ppm' :
                   entry.dataKey === 'soundLevel' ? 'dB' :
                   entry.dataKey === 'temperature' ? '°C' : '%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading)
    return (
      <div className="loading-screen">
        📡 Connecting to IoT Network...
      </div>
    );
  if (error)
    return (
      <div className="error-screen">
        ⚠️ Connection Error: {error}
      </div>
    );

  return (
    <div className="visualization-page dark-theme">
      <WorkflowDiagram />

      <div className="data-container">
        <h2 className="section-title">Real-time Environmental Monitoring</h2>

        <div className="chart-grid">
          <div className="main-chart card">
            <div className="chart-header">
              <h3 className="chart-title">Environmental Parameters</h3>
              <div className="legend-container">
                {[
                  { color: '#10B981', label: 'Air Quality (ppm)' },
                  { color: '#3B82F6', label: 'Sound Level (dB)' },
                  { color: '#FF6B6B', label: 'Temperature (°C)' },
                  { color: '#FFD93D', label: 'Humidity (%)' }
                ].map((item, index) => (
                  <div className="legend-item" key={index}>
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="created_at" tick={{ fill: '#9CA3AF' }} stroke="#4B5563" />
                  <YAxis yAxisId="left" tick={{ fill: '#9CA3AF' }} stroke="#4B5563" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9CA3AF' }} stroke="#4B5563" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    yAxisId="left"
                    dataKey="airQuality"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    dataKey="soundLevel"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    dataKey="temperature"
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    dataKey="humidity"
                    stroke="#FFD93D"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="side-panel">
            <div className="status-card gradient-bg">
              <h3 className="section-title">Current Readings</h3>
              <div className="reading-item">
                <div className="sensor-label">
                  <div className="indicator air-quality"></div>
                  <span>Air Quality</span>
                </div>
                <div className="sensor-value">
                  {data[data.length - 1]?.airQuality || '--'}
                  <span className="unit">ppm</span>
                </div>
              </div>
              <div className="reading-item">
                <div className="sensor-label">
                  <div className="indicator sound-level"></div>
                  <span>Sound Level</span>
                </div>
                <div className="sensor-value">
                  {data[data.length - 1]?.soundLevel || '--'}
                  <span className="unit">dB</span>
                </div>
              </div>
              <div className="reading-item">
                <div className="sensor-label">
                  <div className="indicator temperature"></div>
                  <span>Temperature</span>
                </div>
                <div className="sensor-value">
                  {data[data.length - 1]?.temperature || '--'}
                  <span className="unit">°C</span>
                </div>
              </div>
              <div className="reading-item">
                <div className="sensor-label">
                  <div className="indicator humidity"></div>
                  <span>Humidity</span>
                </div>
                <div className="sensor-value">
                  {data[data.length - 1]?.humidity || '--'}
                  <span className="unit">%</span>
                </div>
              </div>
            </div>

            <a
              href="https://thingspeak.mathworks.com/channels/2655099"
              className="thingspeak-link card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="link-icon" />
              <span>Explore Raw Data</span>
              <span className="platform">ThingSpeak Platform</span>
            </a>

            <a
              href="https://thingspeak.mathworks.com/channels/2522853"
              className="thingspeak-link card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="link-icon" />
              <span>DHT Sensor Data</span>
              <span className="platform">ThingSpeak Platform</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTVisualization;