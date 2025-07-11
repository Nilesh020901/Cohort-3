import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Login to Stayza</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Your hotel’s smart sidekick – let’s simplify your day.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B6E44]"
                        placeholder="you@example.com"
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B6E44]"
                        placeholder="Password"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#8B6E44] text-white font-semibold hover:bg-[#7a5d3a] transition-colors duration-300"
                >
                    Login
                </button>

                {/* Sign-up Link */}
                <p className="text-center text-sm mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-[#8B6E44] font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
