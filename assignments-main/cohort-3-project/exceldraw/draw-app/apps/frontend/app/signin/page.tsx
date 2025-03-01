"use client";
import React, { useState } from "react";
import axios from "axios";
import { AuthLayout } from "../components/AuthPage"

const signin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.post("http://localhost:3001/signin", {
                username: formData.email,
                password: formData.password,
            });

            setMessage("Signin successful");
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Signin failed");
        }
    }
    return (
        <AuthLayout title="sign in">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {["email", "password"].map((feild, idx) => (
                    <input
                        key={idx}
                        type={feild === "email" ? "email" : "password"}
                        name={feild} 
                        placeholder={feild.charAt(0).toUpperCase() + feild.slice(1)}
                        value={formData[feild as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-indigo-500" />
                ))}
                <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700  transition">
                    Sign in
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </AuthLayout>
    )
}

export default signin;