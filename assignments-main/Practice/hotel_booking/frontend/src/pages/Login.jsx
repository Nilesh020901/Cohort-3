import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = async (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold">Stayza</h2>
            <p>Welcome back to Stayza — Your hotel’s smart sidekick.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-full px-4 py-2"
                    required 
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded-full px-4 py-2"
                    required 
                />
                <button type="submit" className="w-full bg-[#8B6E44] text-white rounded-full py-2">
                    Login
                </button>
                <p className="text-center text-sm mt-2">
                    Don't have an account? <a href="/signup" className="text-[#8B6E44] font-medium">Sign up</a>
                </p>
            </form>
        </>
    )
};