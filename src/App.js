import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Data from './components/Data';
import Footer from './components/Footer';
import Visualization from './components/Visualization';
import VisualizationPage from './components/VisualizationPage';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data sensorData={sensorData} />} />
          <Route path="/visualization" element={<Visualization sensorData={sensorData} />} />
          <Route path="/visualization/:location" element={<VisualizationPage sensorData={sensorData} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;