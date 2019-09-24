import React from "react";
import { useSelector } from "react-redux";
import * as rootSelectors from "../../../rootSelectors";
import CurrentFullTimeCell from "./CurrentFullTimeCell";
import CurrentRealTimeCell from "./CurrentRealTimeCell";
import PassiveDay from "./PassiveDay";
import classNames from "./scss/DayRow.module.scss";

const CurrentDaySwitcher = ({ timestampClasses }) => {
    const isStarted = useSelector(rootSelectors.isStarted);
    const { fullTime, realTime, timestamps } = useSelector(
        rootSelectors.getCurrentDay
    );

    return (
        isStarted ? (
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
            <CurrentFullTimeCell className={classNames["day-row__cell"]} />
            <CurrentRealTimeCell className={classNames["day-row__cell"]} />
        </>
    ) : (
        <PassiveDay
            fullTime={fullTime}
            realTime={realTime}
            timestamps={timestamps}
            timestampClasses={timestampClasses}
        />
    ));
};

export default CurrentDaySwitcher;