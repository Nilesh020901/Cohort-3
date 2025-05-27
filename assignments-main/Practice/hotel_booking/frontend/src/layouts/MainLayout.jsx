import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-6">
            <Outlet />
        </main>
        <Footer />
    </>
);

export default MainLayout;
