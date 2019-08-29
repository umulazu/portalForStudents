import React, { useCallback, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import * as rootSelectors from "../../../rootSelectors";
import useInterval from "../../../hooks/useInterval";
import getLastStartDiffNow from "../../../utilities/getLastStartDiffNow";

const CurrentFullTimeCell = ({ className }) => {
    const { lastFullTime, lastStartTimestamp } = useSelector(rootSelectors.getCurrentDayInfo);
    const lastStartDiffNow = lastStartTimestamp && getLastStartDiffNow(lastStartTimestamp);
    const [currentWorkTimeMinutes, setCurrentWorkTimeMinutes] = useState(lastStartDiffNow);
    const setIntervalHandler = useCallback(() => {
        setCurrentWorkTimeMinutes(cur => cur + 1);
        },
        [setCurrentWorkTimeMinutes]
    );
    const clearIntervalHandler = useCallback(() => {
        setCurrentWorkTimeMinutes(0);
        },
        [setCurrentWorkTimeMinutes]
    );
    useInterval(setIntervalHandler, clearIntervalHandler);

    const currentFullTime = getCurrentFullTime(lastFullTime, currentWorkTimeMinutes);

    return (
        <td className={className} data-test-component="CurrentFullTimeCell">
            {currentFullTime}
        </td>
    );
};

export default CurrentFullTimeCell;

const getCurrentFullTime = (lastFullTime, currentWorkTimeMinutes) => {
    return moment(lastFullTime, "HH:mm")
        .add(currentWorkTimeMinutes, "minutes")
        .format("H:mm");
};