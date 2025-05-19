import { useState } from "react";
import api from "../api/axiosInstance";

function RoomForm({ onRoomAdded }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/room", { name, type, price });
            onRoomAdded();
            setName("");
            setType("");
            setPrice("");

        } catch (error) {
            setError("Failed to add room")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            {error && <p className="text-red-500">{error}</p>}
            <input 
                type="text"
                placeholder="Room Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input 
                type="text"
                placeholder="Room Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input 
                type="text"
                placeholder="Room Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">
                Add Room
            </button>
        </form>
    )
};

export default RoomForm;