// src/components/ProgressBar.jsx  
import React from 'react';  

const ProgressCard = ({ percentage, easyCount, medCount, hardCount }) => {  
  return (  
    <div className="my-4">  
      <div className="flex justify-between">  
        <span>Progress</span>  
        <span>{percentage}% Acceptance</span>  
      </div>  
      <div className="w-full h-2 bg-gray-300 rounded-full">  
        <div style={{ width: `${percentage}%` }} className="h-2 bg-green-500 rounded-full" />  
      </div>  
      <div className="flex justify-between mt-1">  
        <span>Easy: {easyCount}</span>  
        <span>Med: {medCount}</span>  
        <span>Hard: {hardCount}</span>  
      </div>  
    </div>  
  );  
};  

export default ProgressCard;