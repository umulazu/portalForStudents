import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import * as selectors from "../selectors";
import * as rootSelectors from "../../../rootSelectors";
import workTimeFormat from "../../../utilities/workTimeFormat";
import useInterval from "../../../hooks/useInterval";
import getLastStartDiffNow from "../../../utilities/getLastStartDiffNow";
import { getWorkStats } from "../utulities";

const RestForCurrentDay = ({ className }) => {
    const workdays = useSelector(rootSelectors.getWorkdays);
    const normOfMonth = useSelector(selectors.getNormOfMonth);
    const { restOfTimeMinutes } = getWorkStats(workdays, normOfMonth);
    const countOfRestLabourDays = useSelector(
        selectors.getCountOfRestLabourDays
    );

    const { lastFullTime, lastStartTimestamp } = useSelector(rootSelectors.getCurrentDayInfo);
    const lastStartDiffNow = lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);

    const [currentWorkTimeMinutes, setCurrentWorkTimeMinutes] = useState(lastStartDiffNow);

    useEffect(() => {
        const lastStartDiffNow = lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
        setCurrentWorkTimeMinutes(lastStartDiffNow);
    }, [lastStartTimestamp]);

    const setIntervalHandler = useCallback(() => {
            if (lastStartTimestamp) {
                setCurrentWorkTimeMinutes(cur => cur + 1);
            }
        },
        [setCurrentWorkTimeMinutes, lastStartTimestamp]
    );
    const clearIntervalHandler = useCallback(() => {
            setCurrentWorkTimeMinutes(0);
        },
        [setCurrentWorkTimeMinutes]
    );
    useInterval(setIntervalHandler, clearIntervalHandler);

    const restOfTimeArgs = {
        lastFullTime,
        currentWorkTimeMinutes,
        restOfTimeMinutes,
        countOfRestLabourDays
    };
    const {restOfTimePerDayHours,
        restOfTimePerDayMinutes
    } = getRestOfTime(restOfTimeArgs);

    const restOfTimePerDayTime = workTimeFormat(
        restOfTimePerDayHours,
        restOfTimePerDayMinutes
    );

    return (
        <div className={className}>
            Остаток на текущий день: {restOfTimePerDayTime}
        </div>
    );
};

export default RestForCurrentDay;

const getRestOfTime = (args) => {
    const {
        lastFullTime,
        currentWorkTimeMinutes,
        restOfTimeMinutes,
        countOfRestLabourDays
    } = args;

    const fullTime =
        currentWorkTimeMinutes + moment.duration(lastFullTime).asMinutes();

    const restOfTimePerDayAsMinutes =
        Math.floor(restOfTimeMinutes / countOfRestLabourDays) - fullTime;
    const restOfTimePerDayHours =
        restOfTimePerDayAsMinutes >= 0
            ? Math.floor(restOfTimePerDayAsMinutes / 60)
            : "-" + Math.floor(-restOfTimePerDayAsMinutes / 60);
    const restOfTimePerDayMinutes = Math.abs(restOfTimePerDayAsMinutes % 60);
    return {
        restOfTimePerDayHours,
        restOfTimePerDayMinutes
    }
};