import { useState } from "react";

function useFetchWeater() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = (city) => {
        if (!city) {
            return;
        }

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
                setError("City not found ❌");
                setLoading(false);
            }
        }, 2000);
    };
    return { weather, loading, error, fetchWeather};
}

export default useFetchWeater;