import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Data from './components/Data';
import Footer from './components/Footer';
import Visualization from './components/Visualization';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState([]);

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
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Home />
      <Data />
      {/* <Visualization data={sensorData} /> */}
      <Footer />
    </div>
  );
}

export default App;
