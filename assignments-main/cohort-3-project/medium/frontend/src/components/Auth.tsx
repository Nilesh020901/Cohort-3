import { useState } from "react";
//import { SignupInput } from "zod";
import TitleAuth from "./AuthHeader";
import LabelInput from "./LabelInput";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast, Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";

export default function Auth({ type }: { type: "signup" | "signin" }) {
    //error comes from zod
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            //i think this error comes from zod
            const jwt = res.data.jwt;
            localStorage.setItem("token", jwt);
            if (res.status === 200) {
                const successMessage = type === "signup" ? "Account created successfully" : "Logged in successfully";
                toast.success(successMessage);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error: any) {
            console.warn(error);
            const errorMessage = error.response?.data?.message ?? "Invalid credentials";
            toast.warning(errorMessage, { duration: 2000 });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <TitleAuth type={type} />
            <div className="grid gap-3 pt-10">
                {type === "signup" ? null : (
                    <LabelInput
                        label="Name"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => {
                            setPostInputs({ ...postInputs, name: e.target.value });
                        }}
                    />
                )}
                <LabelInput 
                    label="Email"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                        setPostInputs({ ...postInputs, email: e.target.value });
                    }} 
                />
                <LabelInput
                    label="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                        setPostInputs({ ...postInputs, password: e.target.value })
                    }}
                />
                <button
					type="button"
					onClick={sendRequest}
					className="mt-5 text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
					{type === "signin" ? "Sign In" : "Sign Up"}
				</button>
            </div>
            {/* <ToastContainer></ToastContainer> */}
            <Toaster 
                closeButton
                position="top-right"
                duration={1200} 
            />
        </div>
    );
} 
