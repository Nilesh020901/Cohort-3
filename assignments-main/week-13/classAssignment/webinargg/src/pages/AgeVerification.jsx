import { useNavigate } from "react-router-dom";

function AgeVerification() {
    return (
        <div className="flex flex-col bg-blue h-screen">
            <div className="flex mt-20 justify-center items-center text-3xl gap-3.5">
                <div><svg className="text-white w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" /></svg></div>
                <div className="text-green">Webinar<span className="text-white">.gg</span></div>
            </div>
        </div>
    )
}

export default AgeVerification;