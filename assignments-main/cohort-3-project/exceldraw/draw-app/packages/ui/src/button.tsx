"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "outline"; 
  size?: "lg" | "sm";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "lg",
  className = "",
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-2 font-fredoka rounded-2xl shadow-lg hover:shadow-xl transition-colors cursor-pointer
        ${variant === "primary" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"} 
        ${size === "lg" ? "px-8 py-4 text-lg" : "px-4 py-2 text-sm"} 
        ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
