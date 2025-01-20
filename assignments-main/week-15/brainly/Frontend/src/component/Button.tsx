import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
}

const variantClasses = {
    primary: "bg-purple-600 text-white-100",
    secondary: "bg-purple-500 text-purple-400",
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({
    variant,
    text,
    startIcon,
}: ButtonProps) {
    return(
        <button className={`${variantClasses[variant]} ${defaultStyles}`}>
            <div>{ startIcon }</div> { text }
        </button>
    )
}