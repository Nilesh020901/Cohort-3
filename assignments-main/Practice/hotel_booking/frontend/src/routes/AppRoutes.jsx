import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import AdminDashboard from "../pages/AdminDashboard";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import HotelView from "../pages/HotelView";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProfilePage from "../pages/ProfilePage";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<MainLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/hotel/:id" element={<HotelView />} />
                <Route path="/booking/id" element={<Booking />} />
                <Route path="/profile" element={<ProtectedRoutes><ProfilePage /></ProtectedRoutes>} />
                <Route path="/admin" element={<AdminRoutes><AdminDashboard /></AdminRoutes>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;