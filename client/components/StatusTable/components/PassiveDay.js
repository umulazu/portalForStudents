import React from "react";
import classNames from "./scss/DayRow.module.scss";

const PassiveDay = ({ fullTime, realTime, timestamps, timestampClasses }) => (
    <>
        <td className={timestampClasses}>
            {timestamps.map((timestamp, index) => (
                <div key={index}>{timestamp.startTime}</div>
            ))}
        </td>
        <td className={timestampClasses}>
            {timestamps.map((timestamp, index) => (
                <div key={index}>
                    {timestamp.finishTime}
                    &nbsp;
                </div>
            ))}
        </td>
        <td
            className={classNames["day-row__cell"]}
            data-test-component="FullTimeCell"
        >
            {fullTime}
        </td>
        <td
            className={classNames["day-row__cell"]}
            data-test-component="RealTimeCell"
        >
            {realTime}
        </td>
    </>
);

export default PassiveDay;