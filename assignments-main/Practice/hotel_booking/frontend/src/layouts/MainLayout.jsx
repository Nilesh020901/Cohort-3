import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <>
        <Navbar />
        <main className="min-h-screen">
            <Outlet />
        </main>
        <Footer />
    </>
);

export default MainLayout;
