import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* left input */}
            <div className="bg-blue-500 p-10 flex flex-col justify-center">
                <Outlet />
            </div>
        </div>
    )
}