import React, { use, useState } from "react";
import axios from "axios";
import { AuthLayout } from "../components/AuthPage"

const signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    return (
        <AuthLayout title="Create an account">
            <form className="space-y-4">
                <input 
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 border rounded-lg focus:ring-indigo-500" 
                />
                <input 
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg focus:ring-indigo-500" 
                />
                <input 
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg focus:ring-indigo-500" 
                />
                <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700  transition">
                    Sign up
                </button>
            </form>
        </AuthLayout>
    );
};

export default signup;