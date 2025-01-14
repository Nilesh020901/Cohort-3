import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar open/close state
    };

    return (
        <div
            className={`h-screen transition-all duration-300 bg-black-700 text-neutral-100 ${
                isOpen ? "w-64" : "w-auto"
            }`}
        >
            <div className="flex flex-col h-full px-2 py-8">
                {/* Header with Toggle Button */}
                <div className={`flex items-center mb-6 ${isOpen ? "justify-between" : "justify-center"}`}>
                    {isOpen && <h2 className="text-lg font-semibold">My Lists</h2>}
                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-md bg-black-700 text-neutral-100 shadow-md hover:bg-black-500"
                    >
                        <svg
                            className="h-5 w-5 text-neutral-100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="9" y1="3" x2="9" y2="21" />
                        </svg>
                    </button>
                </div>

                {/* Sidebar Content */}
                {isOpen && (
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold">Created by me</h3>
                        <div className="flex items-center justify-between hover:bg-black-500 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-7 text-yellow-900 bg-neutral-100 p-[5px] rounded-md"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="font-semibold">Favorite</div>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
