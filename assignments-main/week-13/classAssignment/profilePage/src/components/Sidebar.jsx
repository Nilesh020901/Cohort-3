import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-blue-900 text-white">
            <div>
                <div>Webinar</div>
                <div><img src='#' alt='profile-img' /></div>
            </div>
            <nav>
                <ul className="space-y-4">
                    <li className="p-2 hover:bg-blue-700"><span>Home</span><span>icon</span></li>
                    <li className="p-2 hover:bg-blue-700"><span>Home</span><span>icon</span></li>
                    <li className="p-2 hover:bg-blue-700"><span>Home</span><span>icon</span></li>
                    <li className="p-2 hover:bg-blue-700"><span>Home</span><span>icon</span></li>
                    <li className="p-2 hover:bg-blue-700"><span>Home</span><span>icon</span></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
