import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

function Dashboard() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const [bookingMessage, setBookingMessage] = useState("");
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        api.get("/room")
        .then((res) => setRooms(res.data))
        .catch(() => setError("Failed to load rooms"));
    }, []);

    useEffect(() => {
        api.get("/booking")
        .then((res) => setBookings(res.data))
        .catch(() => setError("Failed to load bookings"));
    }, [])

    const bookRoom = async (roomId) => {
        try {
            await api.post("/booking", { roomId });
            setBookingMessage("Room booked successfully!")
        } catch (error) {
            setBookingMessage("Booking failed!")
        }
    };

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            {bookingMessage && <p className="text-green-500">{bookingMessage}</p>}

            <div className="mt-4">
                <h2 className="text-xl">Available Rooms</h2>
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id} className="p-2 my-2 bg-gray-100 rounded flex justify-between">
                            <div>
                                {room.name} - {room.type} - ${room.price}
                            </div>
                            <button
                                onClick={() => bookRoom(room.id)}
                                className="px-4 py-1 text-white bg-blue-500 rounded">
                                Book Now
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h2 className="text-xl">My Bookings</h2>
                <ul className="mt-2">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="p-2 my-2 bg-gray-200 rounded">
                            Room: {booking.room.name} - Date: {new Date(booking.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;