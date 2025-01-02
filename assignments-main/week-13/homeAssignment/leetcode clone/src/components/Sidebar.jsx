const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-4">
            <h2 className="text-xl font-bold mb-4">My Lists</h2>
            <div className="bg-gray-700 p-2 rounded-md">
                <span className="flex items-center">
                    <span className="text-yellow-400">⭐</span> Favorite
                </span>
            </div>
        </div>
    )
}

export default Sidebar;