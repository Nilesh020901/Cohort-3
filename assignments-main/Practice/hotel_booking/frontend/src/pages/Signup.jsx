import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(form);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold">Stayza</h2>
            <p className="text-sm text-gray-600 mb-4">Sign into your account</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-full px-4 py-2"
                    required
                />
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
                <select 
                    name="role" 
                    value={form.role} 
                    onChange={handleChange} 
                    className="w-full border rounded-full px-4 py-2"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="w-full bg-[#8B6E44] text-white rounded-full py-2">
                    Signup
                </button>
                <p className="text-center text-sm mt-2">
                    Already have an account? 
                    <a href="/login" className="text-[#8B6E44] font-semibold">Login</a>
                </p>
            </form>
        </>
    );
}
export default Signup;

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const { signup } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await signup({ email, password });
//             navigate("/dashboard");
//         } catch (error) {
//             setError('Signup failed');
//         }
//     }
//     return (
//         <div className="p-6 text-center">
//             <h1 className="text-2xl font-bold">Signup</h1>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//                 <input
//                     type="text"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
//                     Signup
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Signup;