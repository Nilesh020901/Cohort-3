import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import RoomForm from "../components/RoomForm";

function AdminDashboard() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");

    const fetchRooms = () => {
        api.get("/room")
        .then((res) => setRooms(res.data))
        .catch(() => setError('Failed to load rooms'));
    };

    useEffect(() => {
        fetchRooms();
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            <RoomForm onRoomAdded={fetchRooms} />
            <div className="mt-4">
                <h2 className="text-xl">Manage Rooms</h2>
                <ul className="mt-2">
                    {rooms.map((room) => (
                        <li key={room.id} className="p-2 my-2 bg-gray-100 rounded">
                            {room.name} - {room.type} - {room.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;