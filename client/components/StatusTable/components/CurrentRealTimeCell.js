import React, { useCallback, useState } from "react";
import * as moment from "moment";
import { useSelector } from "react-redux";
import * as rootSelectors from "../../../rootSelectors";
import workTimeFormat from "../../../utilities/workTimeFormat";
import useInterval from "../../../hooks/useInterval";
import getLastStartDiffNow from "../../../utilities/getLastStartDiffNow";

const CurrentRealTimeCell = ({ className }) => {
    const { lastFullTime, lastStartTimestamp } = useSelector(rootSelectors.getCurrentDayInfo);
    const lastStartDiffNow = lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
    const [currentMinutes, setCurrentMinutes] = useState(
        moment.duration(lastFullTime).asMinutes() + lastStartDiffNow
    );

    const setIntervalHandler = useCallback(() => {
        const lastStartDiffNow =
            lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
        const fullTimeMinutes =
            lastStartDiffNow + moment.duration(lastFullTime).asMinutes();

        if (fullTimeMinutes % 15 === 0) {
            setCurrentMinutes(fullTimeMinutes);
        }
    }, [lastFullTime, lastStartTimestamp]);
    const clearIntervalHandler = useCallback(() => {
        const lastStartDiffNow =
            lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
        setCurrentMinutes(
            moment.duration(lastFullTime).asMinutes() + lastStartDiffNow
        );
    }, [lastStartTimestamp, lastFullTime]);
    useInterval(setIntervalHandler, clearIntervalHandler);

    const {
        currentRealTimeHours,
        currentRealTimeMinutes
    } = getCurrentRealTime(currentMinutes);

    const currentRealTime = workTimeFormat(
        currentRealTimeHours,
        currentRealTimeMinutes
    );

    return (
        <td className={className} data-test-component="CurrentRealTimeCell">
            {currentRealTime}
        </td>
    );
};

export default CurrentRealTimeCell;

const getCurrentRealTime = (currentMinutes) => {
    const currentFullTimeDuration = moment.duration(currentMinutes, "minutes");
    const currentRealTimeHours = Math.floor(
        currentFullTimeDuration.asHours()
    );
    const currentRealTimeMinutes =
        currentFullTimeDuration.minutes() -
        currentFullTimeDuration.minutes() % 15;

    return {
        currentRealTimeHours,
        currentRealTimeMinutes
    }
};
