import { createSelector } from "reselect";

export const getStudentId = state => state.application.login;

export const getWorkdays = state => state.workdaysContainer.workdays;

export const isStarted = state => {
    if (state.buttonPanel.currentDay && state.buttonPanel.currentDay.timestamps.length) {
        const timestamps = state.buttonPanel.currentDay.timestamps;
        const lastTimestamp = timestamps[timestamps.length - 1];
        return !lastTimestamp.finishTime;
    } else {
        return false;
    }
};

export const getCurrentDay = state => state.buttonPanel.currentDay;

export const getCurrentDayInfo = createSelector(
    [getCurrentDay, getWorkdays],
    (currentDay, workdays) => {
        if (currentDay) {
            const lastWorkDay = workdays[workdays.length - 1];

            if (
                lastWorkDay.timestamps.length > currentDay.timestamps.length ||
                (lastWorkDay.timestamps.length ===
                    currentDay.timestamps.length &&
                    lastWorkDay.finishTime &&
                    !currentDay.finishTime)
            ) {
                currentDay = lastWorkDay;
            }

            const { fullTime, timestamps, realTime } = currentDay;
            const startTime = timestamps[timestamps.length - 1].finishTime
                ? null
                : timestamps[timestamps.length - 1].startTime;
            return {
                lastFullTime: fullTime,
                lastStartTimestamp: startTime,
                realTime,
                timestamps,
            };
        } else {
            return {
                lastFullTime: null,
                lastStartTimestamp: null,
                realTime: null,
                timestamps: null,
            };
        }
    }
);