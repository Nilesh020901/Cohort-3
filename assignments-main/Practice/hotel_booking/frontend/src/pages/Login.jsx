import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [ email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password })
        } catch (error) {
            setError('Invalid credentials');
        }
    }
    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded" 
                />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;