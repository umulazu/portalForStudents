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

const getCurrentDay = state => state.buttonPanel.currentDay;

export const getCurrentDayInfo = createSelector(
    [getCurrentDay],
    currentDay => {
        if (currentDay) {
            const { fullTime, timestamps } = currentDay;
            const startTime = timestamps[timestamps.length - 1].finishTime
                ? null
                : timestamps[timestamps.length - 1].startTime;
            return {
                lastFullTime: fullTime,
                lastStartTimestamp: startTime
            }
        } else {
            return {
                lastFullTime: null,
                lastStartTimestamp: null
            }
        }
    }
);