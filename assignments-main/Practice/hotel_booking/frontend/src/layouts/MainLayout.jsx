import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => (
    <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
    </>
);

export default MainLayout;