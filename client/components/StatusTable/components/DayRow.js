import React from "react";
import moment from "moment";
import CurrentFullTimeCell from "./CurrentFullTimeCell";
import classNames from "./scss/DayRow.module.scss";
import getClassNames from "../../../utilities/getClassnames";
import CurrentRealTimeCell from "./CurrentRealTimeCell";
import { useSelector } from "react-redux";
import * as rootSelectors from "../../../rootSelectors";

const DayRow = props => {
    const {
        nameOfTheDay,
        numberOfTheDay,
        fullTime,
        realTime,
        timestamps,
        startTime,
    } = props.workday;
    const { dayRowClasses } = props;

    const nameOfDayClasses = getClassNames({
        [classNames["day-row__cell"]]: true,
        [classNames["day-row__cell_name-of-day"]]: true,
    });
    const timestampClasses = getClassNames({
        [classNames["day-row__cell"]]: true,
        [classNames["day-row__cell_timestamp"]]: true,
    });

    const isStarted = useSelector(rootSelectors.isStarted);
    const isToday =
        moment(startTime).format("MMMM D YYYY") ===
        moment().format("MMMM D YYYY");
    return (
        <tr className={dayRowClasses} data-test-component="DayRow">
            <td className={nameOfDayClasses}>{nameOfTheDay}</td>
            <td className={classNames["day-row__cell"]}>{numberOfTheDay}</td>

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

            {isToday && isStarted ? (
                <>
                    <CurrentFullTimeCell
                        className={classNames["day-row__cell"]}
                    />
                    <CurrentRealTimeCell
                        className={classNames["day-row__cell"]}
                    />
                </>
            ) : (
                <>
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
            )}
        </tr>
    );
};

export default DayRow;