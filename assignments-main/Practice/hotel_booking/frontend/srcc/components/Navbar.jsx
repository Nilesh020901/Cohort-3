import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to={"/"} className="text-2xl font-bold text-gray-900">
                    Hotel Booking
                </Link>

                <div className="flex items-center space-x-8">
                    <Link to="/properties" className="text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out">Properties</Link>
                    <Link to="/attractions" className="text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out">Attractions</Link>
                    <Link to="/popular" className="text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out">Popular</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/signup" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 ease-in-out">
                        Sign up
                    </Link>
                    <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out">
                        Log in
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;