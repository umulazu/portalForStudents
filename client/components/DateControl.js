import React from "react";
import getFullDate from "../utilities/getFullDate";

const DateControl = ({className}) => {
    const date = getFullDate(new Date());

    return (
        <div className={className}>
            <p>{date.dayOfWeek}</p>
            <p>{date.date}</p>
        </div>
    );
};

export default DateControl;
