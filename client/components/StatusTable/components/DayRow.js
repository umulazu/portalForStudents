import React from "react";
import moment from "moment";
import getClassNames from "../../../utilities/getClassnames";
import CurrentDaySwitcher from "./CurrentDaySwitcher";
import PassiveDay from "./PassiveDay";
import classNames from "./scss/DayRow.module.scss";

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

    const isToday =
        moment(startTime).format("MMMM D YYYY") ===
        moment().format("MMMM D YYYY");
    return (
        <tr className={dayRowClasses} data-test-component="DayRow">
            <td className={nameOfDayClasses}>{nameOfTheDay}</td>
            <td className={classNames["day-row__cell"]}>{numberOfTheDay}</td>

            {isToday ? (
                <CurrentDaySwitcher timestampClasses={timestampClasses} />
            ) : (
                <PassiveDay
                    fullTime={fullTime}
                    realTime={realTime}
                    timestamps={timestamps}
                    timestampClasses={timestampClasses}
                />
            )}
        </tr>
    );
};

export default DayRow;