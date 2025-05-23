import { Link } from "react-router-dom";

const Navbar = () => {
    <header className="w-full bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to={"/"} className="text-2xl font-bold text-gray-900">
                Hotel Booking
            </Link>
        </nav>
    </header>
}

export default Navbar;