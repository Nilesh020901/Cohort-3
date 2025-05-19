import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

function AdminDashboard() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/rooms")
        .then((res) => setRooms(res.data))
        .catch(() => setError("Failed to load rooms"));
    }, []);
}