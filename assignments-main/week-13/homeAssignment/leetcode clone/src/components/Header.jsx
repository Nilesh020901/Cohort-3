const Header = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Favorite</h1>
            <button className="bg-gray-700 px-4 py-2 rounded-md">Filter</button>
        </div>
    )
}

export default Header;