import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=473beaf443ae0080fd296017f4620939`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError('');
      } catch (err) {
        setError('Location not found. Please try again.');
      }
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
          className="search-input"
        />
        {error && <p className="error-text">{error}</p>}
      </div>

      {data.name && (
        <div className="weather-card">
          <h2 className="location">{data.name}</h2>
          {data.weather && (
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <p>{data.weather[0].description}</p>
            </div>
          )}
          <h1 className="temperature">{data.main.temp.toFixed()}°C</h1>
          <div className="weather-details">
            <p>Feels Like: {data.main.feels_like.toFixed()}°F</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Pressure: {data.main.pressure} hPa</p>
            {data.wind && (
              <p>
                Wind: {data.wind.speed.toFixed()} MPH, Direction: {data.wind.deg}°
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
