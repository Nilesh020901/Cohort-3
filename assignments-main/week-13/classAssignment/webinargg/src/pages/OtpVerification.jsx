import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const OtpVerification = () => {
    const location = useLocation();
    const email = location.state?.email || "No email provided";
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(600);

    useEffect(() => {
        const intervals = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 0) {
                    clearInterval();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000)

        return () => clearInterval(intervals);
    }, []);

    //input change

    const handleChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value.slice(-1);
        setOtp(updatedOtp);

        //move next box
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    //handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const updatedOtp = [...otp];
            updatedOtp[index] = "";
            setOtp(updatedOtp);

            //move previous
            if (index > 0 && e.key === "Backspace") {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    // paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").splice(0, 6).split("");
        const updatedOtp = otp.map((_, index) => pastedData[index] || "");
        setOtp(updatedOtp);

        //focus last input box because data paste
        const lastFilledIndex = pastedData.length - 1;
        if (lastFilledIndex < 6) {
            inputRefs.current[lastFilledIndex]?.focus();
        }
    };

    //timer
    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        return `${min}:${sec<10 ? "0" : ""}${sec}`;
    };

    return (
        <div className="flex flex-col bg-blue h-screen items-center">
            <div className="flex mt-20 items-center text-2xl gap-4">
                <div><svg className="text-white w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" /></svg></div>
                <div className="text-green tracking-wide">Webinar<span className="text-white">.gg</span></div>
            </div>
            <div className="text-white mt-20 text-center text-3xl font-semibold tracking-wide">Check Your Email For A Code</div>
            <div className="text-gray mt-16 flex flex-col items-center">
                <p>Please enter the verification code sent to your email id <span className="font-semibold">{email}</span></p>
                <div className="flex gap-2 mt-5">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index]) = el}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            maxLength={1}
                            className="w-10 h-12 bg-lightblue border border-gray rounded-xl text-center text-lg text-white focus:outline-none focus-ring focus:ring-lightblue"
                        />
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>{formatTime(timer)}</div>
                </div>
                <button type="submit" className="border px-4 py-2 bg-btngray text-white rounded-lg mt-10 w-96 border-none text-xl hover:bg-green hover:text-black">
                    Verify
                </button>
                <p className="mt-4">Can't find the email? Click <a href="/email" className="text-white underline">here</a> to resend</p>
            </div>
        </div>
    )
}

export default OtpVerification;