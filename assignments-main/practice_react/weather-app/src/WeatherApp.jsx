import React, { useState } from "react";
import { useFetchWeather } from "./useFetchWeather";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const { weatherData, loading, error, fetchWeather } = useFetchWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>🌦 Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "1rem", textAlign: "left" }}>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>🌡 Temp: {weatherData.main.temp}°C</p>
          <p>☁ Weather: {weatherData.weather[0].main}</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
