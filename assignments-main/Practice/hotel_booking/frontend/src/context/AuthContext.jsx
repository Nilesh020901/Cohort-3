import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/auth/me")
                .then((res) => setUser(res.data.user))
                .catch(() => setUser(null))
        }
    }, []);

    const login = async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
    };

    const signup = async (data) => {
        const response = await api.post("/auth/signup", data);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}