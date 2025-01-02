const ProgressCard = () => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-md w-1/3">
            <h3 className="text-lg font-bold">Progress</h3>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-green-400 text-2xl font-bold">19/19</p>
                    <p className="text-sm">Solved</p>
                </div>
                <div className="text-sm">
                    <p>Easy: 11</p>
                    <p>Medium: 7</p>
                    <p>Hard: 1</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;