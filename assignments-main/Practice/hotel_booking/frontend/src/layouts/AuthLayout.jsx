import React from "react";
import { Outlet } from "react-router-dom";

const hotels = [
    { image: "/images/img-3.jpg", className: "row-span-3 col-span-2", name: "Hotel-3" },
    { image: "/images/img-2.jpg", className: "row-span-1 col-span-2", name: "Hotel-1" },
    { image: "/images/img-1.jpg", className: "row-span-2 col-span-2", name: "Hotel-2" },
    { image: "/images/img-4.jpg", className: "row-span-2 col-span-2", name: "Hotel-4" },
    { image: "/images/img-5.jpg", className: "row-span-1 col-span-2", name: "Hotel-5" },
]

export default function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* left part */}
            <div className="bg-blue-500 p-10 flex flex-col justify-center">
                <Outlet />
            </div>
            {/* right part */}
            <div className="hidden md:flex flex-col justify-center items-center p-7">
                <div className="grid grid-flow-col grid-rows-2 gap-3 h-96">
                    {hotels.map((hotel, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-2xl overflow-hidden shadow-md ${hotel.className} hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out`}>
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6">
                    <h2 className="text-xl font-semibold">Stayza = Stay + Simplicity</h2>
                    <p className="text-sm text-gray-600 mt-2">
                        One platform to manage everything from check-in to check-out.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Simplify bookings, manage rooms, and delight your guests — effortlessly.
                    </p>
                </div>
            </div>
        </div>
    )
}
