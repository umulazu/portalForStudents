import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as selectors from "../selectors";
import workTimeFormat from "../../../utilities/workTimeFormat";
import useInterval from "../../../hooks/useInterval";
import RestForCurrentDay from "./RestForCurrentDay";
import * as rootSelectors from "../../../rootSelectors";
import getLastStartDiffNow from "../../../utilities/getLastStartDiffNow";
import moment from "moment";
import { getWorkStats } from "../utulities";

const CurrentWorkTime = ({ className, classModifier }) => {
    const workdays = useSelector(rootSelectors.getWorkdays);
    const normOfMonth = useSelector(selectors.getNormOfMonth);
    const { realTimeMinutes, restOfTimeMinutes } = getWorkStats(workdays, normOfMonth);
    const { lastFullTime, lastStartTimestamp } = useSelector(rootSelectors.getCurrentDayInfo);
    const lastStartDiffNow = lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
    const [currentMinutes, setCurrentMinutes] = useState(
        moment.duration(lastFullTime).asMinutes() + lastStartDiffNow
    );

    useEffect(() => {
        const lastStartDiffNow = lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
        setCurrentMinutes(moment.duration(lastFullTime).asMinutes() + lastStartDiffNow);
    }, [lastFullTime, lastStartTimestamp]);

    const setIntervalHandler = useCallback(() => {
        const lastStartDiffNow =
            lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
        const fullTimeMinutes = lastStartDiffNow + moment.duration(lastFullTime).asMinutes();
        if (fullTimeMinutes % 15 === 0) {
            setCurrentMinutes(fullTimeMinutes);
        }
    }, [lastFullTime, lastStartTimestamp]);
    const clearIntervalHandler = useCallback(() => {
            const lastStartDiffNow =
                lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
            setCurrentMinutes(moment.duration(lastFullTime).asMinutes() + lastStartDiffNow);
        },
        [lastStartTimestamp, lastFullTime]
    );
    useInterval(setIntervalHandler, clearIntervalHandler);

    const {
        workedHours,
        workedMinutes
    } = getWorkedTime(realTimeMinutes, currentMinutes);
    const workedTime = workTimeFormat(workedHours, workedMinutes);

    const {
        restHours,
        restMinutes
    } = getRestTime(restOfTimeMinutes, currentMinutes);
    const restTime = workTimeFormat(restHours, restMinutes);

    return (
        <>
            <RestForCurrentDay className={className} classModifier={classModifier} />
            <div>Остаток до конца месяца: {restTime}</div>
            <div>&nbsp;</div>
            <div>Отработанное время за месяц: {workedTime}</div>
        </>
    );
};

export default CurrentWorkTime;

const getWorkedTime = (realTimeMinutes, currentMinutes) => {
    const workedHours = Math.floor((realTimeMinutes + currentMinutes) / 60);
    const workedMinutes =
        (realTimeMinutes + currentMinutes - (currentMinutes % 15)) % 60;

    return {
        workedHours,
        workedMinutes
    };
};

const getRestTime = (restOfTimeMinutes, currentMinutes) => {
    const restHours = Math.floor(
        (restOfTimeMinutes - currentMinutes + (currentMinutes % 15)) / 60
    );
    const restMinutes =
        (restOfTimeMinutes - currentMinutes + (currentMinutes % 15)) % 60;

    return {
        restHours,
        restMinutes
    };
};