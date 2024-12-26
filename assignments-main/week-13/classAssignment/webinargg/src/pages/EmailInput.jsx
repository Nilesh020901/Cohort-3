import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EmailInput = () => {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    const sendotp = () => {
        const generatedOtp = generateOtp();
        setOtp(generatedOtp);
        alert(`OTP sent to ${email}: ${generatedOtp}`);
        navigate('/otp');
    }

    return (
        <div className="flex flex-col bg-blue h-screen items-center">
            <div className="flex mt-20 items-center text-2xl gap-4">
                <div><svg className="text-white w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" /></svg></div>
                <div className="text-green tracking-wide">Webinar<span className="text-white">.gg</span></div>
            </div>
            <div className="text-white mt-20 text-center text-3xl font-semibold tracking-wide">Let's Get Started</div>
            <form 
                className="flex flex-col items-center" 
                onSubmit={(e) => {
                    e.preventDefault();
                    sendotp();}}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Id"
                className="border px-4 py-2 rounded-lg bg-lightblue border-lightgray mt-16 text-white w-96"
                />
                <button type="submit" className="border px-4 py-2 bg-btngray text-white rounded-lg mt-10 w-96 border-none text-xl hover:bg-green hover:text-black">
                    Continue
                </button>
            </form>
        </div>
    )
}

export default EmailInput;