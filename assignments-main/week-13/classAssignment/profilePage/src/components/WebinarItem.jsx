import React from "react";

const WebinarItem = ({time, status, title}) => {
    return (
        <div>
            <div>
            <span>{time}</span>
            <span>{status}</span>
            <span>icon</span>
            </div>
            <div>
            <span>{time}</span>
            <span>{title}</span>
            </div>
        </div>
    );
};

export default WebinarItem;