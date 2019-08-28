import { createSelector } from "reselect";

export const getStudentId = state => state.application.name;

export const getWorkdays = state => state.workdaysContainer.workdays;

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