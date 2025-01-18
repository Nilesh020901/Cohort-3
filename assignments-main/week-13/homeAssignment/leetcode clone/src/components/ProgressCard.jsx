// src/components/ProgressBar.jsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressCircle from "./ProgressCircle";

const ProgressCard = () => {
  const totalSolved = 19;
  const totalQuestion = 19;
  const easySolved = 11;
  const easyTotal = 11;
  const medSolved = 7;
  const medTotal = 7;
  const hardSolved = 1;
  const hardTotal = 1;

  const percentage = (totalSolved / totalQuestion) * 100;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-neutral-100 text-xl font-semibold">Progress</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="size-5 font-light text-gray-500"
          >
            <path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {/* Progress Bar */}
        <div className="col-span-5 bg-black-700 rounded-lg shadow-lg flex justify-center items-center">
          <ProgressCircle />
        </div>

        {/* Easy, Medium, Hard stats */}
        <div className="col-span-2 flex flex-col gap-3">
          <div className="bg-black-700 rounded-lg px-4 py-2 flex flex-col justify-center items-center shadow-lg">
            <div className="text-cyan-900 font-semibold text-base">Easy</div>
            <div className="text-neutral-100 text-base font-medium">{`${easySolved}/${easyTotal}`}</div>
          </div>
          <div className="bg-black-700 rounded-lg px-4 py-2 flex flex-col justify-center items-center shadow-lg">
            <div className="text-yellow-800 font-semibold text-base">Med.</div>
            <div className="text-neutral-100 text-base font-medium">{`${medSolved}/${medTotal}`}</div>
          </div>
          <div className="bg-black-700 rounded-lg px-4 py-2 flex flex-col justify-center items-center shadow-lg">
            <div className="text-red-900 font-semibold text-base">Hard</div>
            <div className="text-neutral-100 text-base font-medium">{`${hardSolved}/${hardTotal}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
