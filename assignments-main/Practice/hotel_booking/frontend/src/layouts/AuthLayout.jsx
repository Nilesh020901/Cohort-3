import React from "react";
import { Outlet } from "react-router-dom";

const hotels = [
    { image: "/images/img-3.jpg", className: "row-span-3 col-span-2", name: "Hotel Luxe" },
    { image: "/images/img-2.jpg", className: "row-span-1 col-span-2", name: "Seaside Inn" },
    { image: "/images/img-1.jpg", className: "row-span-2 col-span-2", name: "City Stay" },
    { image: "/images/img-4.jpg", className: "row-span-2 col-span-2", name: "Mountain View" },
    { image: "/images/img-5.jpg", className: "row-span-1 col-span-2", name: "Sunset Resort" },
];

export default function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            {/* Left Section - Auth Form */}
            <div className="bg-gradient-to-br from-[#ada996] via-[#f2f2f2] to-[#eaeaea] p-10 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Welcome to Stayza</h1>
                    <p className="text-md text-gray-600 text-center mb-6">
                        Your hotel experience, simplified.
                    </p>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Right Section - Image Grid */}
            <div className="hidden md:flex flex-col justify-center items-center bg-gray-50 p-8">
                <div className="grid grid-cols-4 grid-rows-4 gap-3 h-[550px] w-full max-w-lg">
                    {hotels.map((hotel, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-2xl overflow-hidden shadow-md ${hotel.className} hover:scale-[1.03] hover:shadow-xl transform transition-all duration-300`}
                        >
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm font-medium px-3 py-2 backdrop-blur-sm">
                                {hotel.name}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800">Stayza = Stay + Simplicity</h2>
                    <p className="text-sm text-gray-600 mt-3">
                        Manage bookings, rooms, and guest experiences – all in one place.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Seamlessly handle check-ins, check-outs, and everything in between.
                    </p>
                </div>
            </div>
        </div>
    );
}
