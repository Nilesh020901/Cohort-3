import React, {useState} from "react";
import useFetchWeather from "./useFetchWeater";

function WeatherApp() {
    const [city, setCity] = useState("");
    const { weather, loading, error, fetchWeather } = use
    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
    }

    return(
        <div style={{ padding: "20px" }}>
            <h2>🌤️ Weather App</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter a city name"
                    value={city}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather && (
                <div style={{ marginTop: "20px" }}>
                    <h3>📍 {weather.city}</h3>
                    <p>Temperature: {weather.temp}</p>
                    <p>Condition: {weather.condition}</p>
                </div>
            )}
        </div>    
    );
}

export default WeatherApp;