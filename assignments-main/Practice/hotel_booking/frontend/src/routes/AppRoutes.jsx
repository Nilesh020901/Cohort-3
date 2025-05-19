import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
                <Route path="/admin" element={<AdminRoutes><AdminDashboard /></AdminRoutes>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;