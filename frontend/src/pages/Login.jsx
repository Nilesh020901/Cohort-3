import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Login</h1>
        </div>
    );
}

export default Login