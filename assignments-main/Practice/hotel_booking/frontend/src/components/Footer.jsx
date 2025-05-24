function Footer() {
    return (
        <footer className="bg-gray-100 p-10 mt-10">
            <div className="flex justify-between">
                <div>
                    <h2 className="font-bold text-lg">Hotel Booking</h2>
                    <p className="text-sm text-gray-600">Your favorite hotel booking experience since 1997!</p>
                    <p className="text-sm text-gray-400 mt-2">© 2022 Uizard</p>
                </div>
                <ul>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Terms of Service</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Contact Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">About Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Careers</a></li>
                </ul>
                <ul>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Facebook</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">LinkedIn</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">YouTube</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Twitter</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out">Instagram</a></li>
                </ul>
                <div className="text-right">
                    <h3 className="font-bold">Help</h3>
                    <ul className="text-sm space-y-1 mt-2">
                        <li>FAQ</li>
                        <li>Customer service</li>
                        <li>How to guide</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;