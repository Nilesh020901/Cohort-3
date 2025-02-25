"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  appName: string;
}

export const Button = ({ children, className, appName, variant, onClick  }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
