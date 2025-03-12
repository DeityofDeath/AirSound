import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCloud, FaVolumeUp } from 'react-icons/fa';
import Modal from 'react-modal';
import './Data.css';

Modal.setAppElement('#root');

function Data() {
  const [airQuality1, setAirQuality1] = useState(null);
  const [airQuality2, setAirQuality2] = useState(null);
  const [soundLevel1, setSoundLevel1] = useState(null);
  const [soundLevel2, setSoundLevel2] = useState(null);
  const [co2Level, setco2Level] = useState(null);
  const [coLevel, setcoLevel] = useState(null);
  const [nh4Level, setnh4Level] = useState(null);
  const [touleneLevel, settouleneLevel] = useState(null);
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data');
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setAirQuality1(response.data.airQuality1);
          setSoundLevel1(response.data.soundLevel1);
          setAirQuality2(response.data.airQuality2);
          setSoundLevel2(response.data.soundLevel2);
          setco2Level(response.data.co2level);
          setcoLevel(response.data.colevel);
          setnh4Level(response.data.nh4level);
          settouleneLevel(response.data.toulenelevel);
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setMessage("Error fetching data");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);

    return () => clearInterval(interval);
  }, []);

  const getAirQualityMessage = (value) => {
    if (value < 400) return 'Good for health';
    if (value < 750) return 'Good for health';
    if (value < 1200) return 'Take care';
    return 'Harmful to health';
  };

  const getSoundLevelMessage = (value) => {
    if (value < 50) return 'Quiet';
    if (value < 80) return 'Moderate';
    return 'Loud';
  };

  const openModal = (location) => {
    setSelectedLocation(location);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div id="data" className="data-container">
      {message ? (
        <p className="error-message">{message}</p>
      ) : (
        <div className="data-boxes">
          {/* Location 1 */}
          <div className="data-box">
            <div className="box-header">
              <h3>Location 1</h3>
              <div className="icon-container">
                <FaCloud className="icon" />
                <FaVolumeUp className="icon" />
              </div>
            </div>
            <div className="box-content">
              <p>Air Quality (Air-1): {airQuality1 !== null ? airQuality1 : 'Loading...'}</p>
              <p>Sound Level (Sound-1): {soundLevel1 !== null ? soundLevel1 : 'Loading...'}</p>
              <button className="toggle-details-btn" onClick={() => openModal('Location 1')}>
                Show Details
              </button>
            </div>
          </div>

          {/* Location 2 */}
          <div className="data-box">
            <div className="box-header">
              <h3>Location 2</h3>
              <div className="icon-container">
                <FaCloud className="icon" />
                <FaVolumeUp className="icon" />
              </div>
            </div>
            <div className="box-content">
              <p>Air Quality (Air-2): {airQuality2 !== null ? airQuality2 : 'Device Offline'}</p>
              <p>Sound Level (Sound-2): {soundLevel2 !== null ? soundLevel2 : 'Device Offline'}</p>
              <button className="toggle-details-btn" onClick={() => openModal('Location 2')}>
                Show Details
              </button>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <h2 >{selectedLocation}</h2>
            {selectedLocation === 'Location 1' ? (
              <>
                <p>Air Quality (Air-1): {airQuality1 !== null ? `${airQuality1} - ${getAirQualityMessage(airQuality1)}` : 'Loading...'}</p>
                <p>Sound Level (Sound-1): {soundLevel1 !== null ? `${soundLevel1} - ${getSoundLevelMessage(soundLevel1)}` : 'Loading...'}</p>
                <p>CO2 Level:  {co2Level !== null ? `${co2Level}` : 'Loading...'}</p>
                <p>CO Level:  {coLevel !== null ? `${coLevel}` : 'Loading...'}</p>
                <p>NH4 Level:  {nh4Level !== null ? `${nh4Level}` : 'Loading...'}</p>
                <p>Toulene Level:  {touleneLevel !== null ? `${touleneLevel}` : 'Loading...'}</p>
              </>
            ) : (
              <>
                <p>Air Quality (Air-2): {airQuality2 !== null ? `${airQuality2} - ${getAirQualityMessage(airQuality2)}` : 'Device Offline'}</p>
                <p>Sound Level (Sound-2): {soundLevel2 !== null ? `${soundLevel2} - ${getSoundLevelMessage(soundLevel2)}` : 'Device Offline'}</p>
              </>
            )}
            <button className="modal-close-btn" onClick={closeModal}>Close</button>
          </Modal>
          </div>
      )}
    </div>
  );
}

export default Data;
