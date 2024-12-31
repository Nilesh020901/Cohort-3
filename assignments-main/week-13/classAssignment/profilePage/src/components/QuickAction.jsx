import React from "react";

const QuickAction = () => {
    return (
        <div className="bg-white rounded-lg col-span-7 md:col-span-3 shadow-lg grid grid-cols-2 h-64 items-center justify-center">
            <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="bg-teal-400 w-14 h-14 rounded-xl flex items-center justify-center mb-2"><svg className="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                </svg>
                </div>
                <div className="font-semibold">Schedule a Webinar</div>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="bg-teal-400 w-14 h-14 rounded-xl flex items-center justify-center mb-2"><svg className="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                </div>
                <div className="font-semibold">Join a Webinar</div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="bg-teal-400 w-14 h-14 rounded-xl flex items-center justify-center mb-2"><svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                </div>
                <div className="font-semibold">Open Recordings</div>
            </div>
        </div>
    );
};

export default QuickAction;