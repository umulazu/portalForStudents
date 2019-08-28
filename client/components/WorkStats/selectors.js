import moment from "moment";
import { createSelector } from "reselect";
import { getWorkdays } from "../../rootSelectors";

export const getCountOfRestLabourDays = state =>
    state.workStats.countOfRestLabourDays;

export const getFirstWorkdayOfPeriod = state =>
    state.workdaysContainer.workdays.length
        ? state.workdaysContainer.workdays[0].startTime
        : null;

const getNormOfMonth = state => state.workStats.normOfMonth;

export const getWorkStats = createSelector(
    [getWorkdays, getNormOfMonth],
    (workdays, normOfMonth) => {
        const rawRealTime = workdays.reduce((prev, cur) => {
            if (moment(cur.startTime).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) {
                return moment.duration(prev.add(moment.duration(cur.realTime)));
            } else {
                return moment.duration(prev.add(moment.duration(0)));
            }
        }, moment.duration(0));
        const workedMinutes = rawRealTime.asMinutes();
        const restMinutes =
            moment.duration(normOfMonth, "h").asMinutes() - workedMinutes;

        return {
            normOfMonth,
            realTimeMinutes: !workdays && !workdays.length ? 0 : workedMinutes,
            restOfTimeMinutes: !workdays && !workdays.length ? 0 : restMinutes,
        };
    }
);

export const getNormForTheDay = createSelector(
    [getWorkdays, getNormOfMonth],
    (workdays, normOfMonth) => {
        const rawRealTime = workdays.reduce((prev, cur, index) => {
            if (moment(cur.startTime).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) {
                return moment.duration(prev.add(moment.duration(cur.realTime)));
            } else {
                return moment.duration(prev.add(moment.duration(0)));
            }
        }, moment.duration(0));
        const workedMinutes = rawRealTime.asMinutes();
        const restMinutes =
            moment.duration(normOfMonth, "h").asMinutes() - workedMinutes;

        return {
            restOfTimeMinutes: !workdays && !workdays.length ? 0 : restMinutes,
        };
    }
);
