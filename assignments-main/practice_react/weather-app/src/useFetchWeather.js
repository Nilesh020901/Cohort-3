import { useState } from "react";

const API_KEY = "34390a97d43446de8bbca2d7560942a2";

function useFetchWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async (city) => {
        if (!city) {
            return;
        }

        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) {
                throw new Error("City not found");
            }
            const data = await res.json();
            setWeather(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, fetchWeather};
}

export default useFetchWeather;