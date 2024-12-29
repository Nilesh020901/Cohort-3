import React from 'react';
import nileshImg1 from "./images/nilesh-img1.jpg"

const ProfileCard = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg shadow-lg h-96 -translate-y-12 bg-white">
            <img
                src={nileshImg1}
                alt="Profile"
                className="w-24 h-24 rounded-2xl"
            />
            <div className='mt-6 text-center'>
                <h2 className="font-bold text-lg mb-2 text-sky-950">Nilesh Soni</h2>
                <p className="text-gray-600 mb-1 font-medium">nileshsoni@gmail.com</p>
                <p className="text-gray-600 mb-2 font-medium">8356004765</p>
                <p className="text-gray-600 font-medium">Mumbai, India</p>
            </div>
        </div>
    );
};

export default ProfileCard;
