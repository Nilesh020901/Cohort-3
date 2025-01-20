import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
}

const variantClasses = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-500 text-purple-400",
}

const defaultStyles = "px-4 py-2 rounded-lg font-normal text-lg flex items-center justify-center gap-1";

export function Button({
    variant,
    text,
    startIcon,
}: ButtonProps) {
    return(
        <button className={variantClasses[variant] + " " + defaultStyles}>
            <span>{ startIcon }</span>
            <span>{ text }</span>
        </button>
    )
}