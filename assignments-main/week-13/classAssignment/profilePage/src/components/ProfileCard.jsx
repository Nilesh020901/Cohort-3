import React from 'react';

const ProfileCard = () => {
    return (
        <div className="flex flex-col items-center bg-white shadow rounded-lg m-4 pb">
            <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
                <h2 className="font-bold text-lg">Prabhleen Kaur</h2>
                <p className="text-gray-600">prabhleen@gmail.com</p>
                <p className="text-gray-600">Delhi, India</p>
            </div>
        </div>
    );
};

export default ProfileCard;
