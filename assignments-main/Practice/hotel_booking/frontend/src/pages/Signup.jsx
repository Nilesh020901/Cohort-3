import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ email, password });
            navigate("/dashboard");
        } catch (error) {
            setError('Signup failed');
        }
    }
    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Signup</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup;