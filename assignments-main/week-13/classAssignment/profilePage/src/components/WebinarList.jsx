import React from "react";
import WebinarItem from "./WebinarItem";

const WebinarList = () => {
    const webinars = [
        { time: '11:30 AM', status: 'Live', title: 'UX Webinar' },
        { time: '11:30 AM', status: 'Upcoming', title: 'My First Webinar' },
        { time: '11:30 AM', status: 'Upcoming', title: 'Important Webinar' },
        { time: '11:30 AM', status: 'Upcoming', title: 'Webinar 1' },
    ];

    return (
        <div>
            <div>
                <div>
                    <div>calendar icon</div>
                    <div>time</div>
                    <div>down icon</div>
                </div>
                <div>
                    <div>left arrow</div>
                    <div>right arrow</div>
                </div>
            </div>
            <div>
                {webinars.map((webinar, index) => {
                    <WebinarItem
                        key={index}
                        time={webinar.time}
                        status={webinar.status}
                        title={webinar.title}
                    />
                })}
            </div>
        </div>
    );
};

export default WebinarList;