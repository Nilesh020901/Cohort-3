import React, {useState} from "react";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Search city:", city); // Next step: API call

        if (!city) return;

        setLoading(true);
        setError("");
        setWeather(null);

        setTimeout(() => {
            if (city.toLowerCase() === "mumbai") {
                setWeather({
                    city: "Mumbai",
                    temp: "32°C",
                    condition: "Sunny ☀️"
                });
                setLoading(false);
            } else {
                setError("City not found ❌")
                setLoading(false);
            }
        }, 2000);
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