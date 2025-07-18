import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Eye, Droplets, Wind, Thermometer, Sun, Cloud, CloudRain, CloudSnow, Zap
} from 'lucide-react';
import './App.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mockWeatherData = {
    'madurai': { city: 'Madurai', country: 'IN', temperature: 32, condition: 'Hot & Sunny', humidity: 68, windSpeed: 8, visibility: 12, feelsLike: 38, icon: 'sunny' },
    'chennai': { city: 'Chennai', country: 'IN', temperature: 31, condition: 'Humid & Sunny', humidity: 78, windSpeed: 12, visibility: 10, feelsLike: 36, icon: 'sunny' },
    'kochi': { city: 'Kochi', country: 'IN', temperature: 28, condition: 'Rainy', humidity: 88, windSpeed: 15, visibility: 5, feelsLike: 32, icon: 'rainy' },
    'bangalore': { city: 'Bangalore', country: 'IN', temperature: 26, condition: 'Pleasant', humidity: 62, windSpeed: 6, visibility: 15, feelsLike: 28, icon: 'partly-cloudy' },
    'mumbai': { city: 'Mumbai', country: 'IN', temperature: 30, condition: 'Humid', humidity: 82, windSpeed: 14, visibility: 8, feelsLike: 35, icon: 'partly-cloudy' },
  };

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case 'sunny': return <Sun className="icon sun" />;
      case 'partly-cloudy': return <Cloud className="icon cloud" />;
      case 'rainy': return <CloudRain className="icon rain" />;
      case 'snowy': return <CloudSnow className="icon snow" />;
      case 'stormy': return <Zap className="icon storm" />;
      default: return <Sun className="icon default" />;
    }
  };

  const getBackgroundClass = (icon) => {
    switch (icon) {
      case 'sunny': return 'bg-sunny';
      case 'rainy': return 'bg-rainy';
      case 'partly-cloudy': return 'bg-cloudy';
      default: return 'bg-default';
    }
  };

  const searchWeather = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    setTimeout(() => {
      const weatherData = mockWeatherData[city.toLowerCase()];
      if (weatherData) {
        setWeather(weatherData);
      } else {
        setError('City not found. Try: Madurai, Chennai, Kochi, Bangalore, Mumbai.');
        setWeather(null);
      }
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    setWeather(mockWeatherData['madurai']);
  }, []);

  return (
    <div className={`weather-app ${weather ? getBackgroundClass(weather.icon) : ''}`}>
      <div className="container">
        <h1>🌦️ Weather Forecast</h1>

        <form className="search-box" onSubmit={searchWeather}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : <Search size={20} />}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <div className="top-info">
              <MapPin size={18} /> <span>{weather.city}, {weather.country}</span>
            </div>
            <div className="icon-temp">
              {getWeatherIcon(weather.icon)}
              <h2>{weather.temperature}°C</h2>
              <p>{weather.condition}</p>
              <span className="feels-like">Feels like: {weather.feelsLike}°C</span>
            </div>

            <div className="info-grid">
              <div className="info-box">
                <Droplets /> <h4>Humidity</h4>
                <p>{weather.humidity}%</p>
              </div>
              <div className="info-box">
                <Wind /> <h4>Wind Speed</h4>
                <p>{weather.windSpeed} km/h</p>
              </div>
              <div className="info-box">
                <Eye /> <h4>Visibility</h4>
                <p>{weather.visibility} km</p>
              </div>
              <div className="info-box">
                <Thermometer /> <h4>Feels Like</h4>
                <p>{weather.feelsLike}°C</p>
              </div>
            </div>

            <div className="ads-card">
              🌞 <strong>Seasonal Tip:</strong> Drink water regularly and stay cool!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
