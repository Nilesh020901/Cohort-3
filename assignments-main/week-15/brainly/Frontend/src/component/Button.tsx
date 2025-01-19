import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
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
    onClick,
    fullWidth = false,
    loading = false,
}: ButtonProps) {
    return(
        <button onClick={onclick}
                className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : "" } ${loading ? "opacity-45" : ""}`}>
                    
                </button>
    )
}