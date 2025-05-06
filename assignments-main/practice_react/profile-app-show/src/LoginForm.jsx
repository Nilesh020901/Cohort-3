import { useState } from "react";

function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.email.trim() === "" || form.password.trim() === "") {
            setError("Please fill all fields");
            return;
        }

        setError("");
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setForm({ email: "", password: "" });
    }
    return (
        <div style={{ maxWidth: "300px", margin: "auto", padding: "20px", border: "1px solid #ccc" }}>
            {!isLoggedIn ? (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <br />
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        <br />
                        <button type="submit">Login</button>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </>
            ) : (
                <>
                    <h2>Welcome, {form.email}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
}

export default LoginForm;