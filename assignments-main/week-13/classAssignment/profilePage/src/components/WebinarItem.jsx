import React from "react";

const WebinarItem = ({ time, status, title }) => {
    return (
        <div className="flex flex-col border-b border-neutral-200 p-2">
            <div className="flex gap-3">
                <div>
                    <div className="font-semibold text-lg">{time}</div>
                    <div className="text-sm">{time}</div>
                </div>
                <div className="h-auto w-[1.5px] bg-teal-400"></div>
                <div>
                    <div className="flex items-center gap-2">
                        <div>{status}</div>
                        <div className={status === 'Live' ? 'text-red-400' : 'text-blue-400'}><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                        </svg>
                        </div>
                    </div>
                    <div className="font-semibold text-lg">{title}</div>
                </div>
            </div>
        </div>
    );
};

export default WebinarItem;