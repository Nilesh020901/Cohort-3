import React from "react";

const ProgressCircle = () => {
  // Progress values
  const total = 19;
  const easy = 11; // Easy takes 70% of the circle
  const medium = 9; // Medium takes 20%
  const hard = 1; // Hard takes 10%

  // Stroke values
  const circleCircumference = 318.086; // Circumference of the circle (2 * Math.PI * r)
  const easyStroke = (easy / total) * circleCircumference;
  const mediumStroke = (medium / total) * circleCircumference;
  const hardStroke = (hard / total) * circleCircumference;

  return (
    <div className="relative flex justify-center items-center h-44 w-44 text-sm font-normal">
      {/* Background Circle */}
      <div className="absolute h-24 w-24 rounded-full"></div>

      {/* SVG Progress Circles */}
      <svg viewBox="0 0 108 108" className="absolute h-44 w-44 transform -rotate-90">
        {/* Easy Progress */}
        <circle
          cx="54"
          cy="54"
          r="50.625"
          className="fill-none stroke-cyan-900 stroke-[3.375px]"
          strokeDasharray={`${easyStroke} ${circleCircumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
        />
        {/* Medium Progress */}
        <circle
          cx="54"
          cy="54"
          r="50.625"
          className="fill-none stroke-yellow-800 stroke-[3.375px]"
          strokeDasharray={`${mediumStroke} ${circleCircumference}`}
          strokeDashoffset={`-${easyStroke}`}
          strokeLinecap="round"
        />
        {/* Hard Progress */}
        <circle
          cx="54"
          cy="54"
          r="50.625"
          className="fill-none stroke-red-900 stroke-[3.375px]"
          strokeDasharray={`${hardStroke} ${circleCircumference}`}
          strokeDashoffset={`-${easyStroke + mediumStroke}`}
          strokeLinecap="round"
        />
      </svg>

      {/* Circle Text */}
      <div className="relative z-10 text-center">
        <div className="text-neutral-100 text-4xl font-semibold">
          <span>85.</span>
          <span className="text-sm">42%</span>
        </div>
        <div className="text-neutral-100 text-lg">Acceptance</div>
      </div>
    </div>
  );
};

export default ProgressCircle;
