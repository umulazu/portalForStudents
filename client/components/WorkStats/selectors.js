import moment from "moment";
import { createSelector } from "reselect";
import { getWorkdays } from "../../rootSelectors";
import { accumulateRealTime, getCountOfLabourDays } from "./utilities";

export const getFirstWorkdayOfPeriod = state =>
    state.workdaysContainer.workdays.length
        ? state.workdaysContainer.workdays[0].startTime
        : null;

const getSpecialDays = state => state.workStats.specialDays;
const getHoursPerDay = state => state.workStats.hoursPerDay;

export const staticDataHandler = (firstWorkdayOfMonth, specialDays, hoursPerDay) => {
    let countOfRestLabourDays = 0;
    let normOfMonth = 0;

    if (firstWorkdayOfMonth && specialDays && hoursPerDay) {
        const firstDayOfMonth = moment(firstWorkdayOfMonth)
            .startOf("month")
            .add(3, "hours");
        const firstDayOfNextMonth = moment(firstWorkdayOfMonth)
            .endOf("month")
            .add(3, "hours");
        const countOfLabourDays = getCountOfLabourDays(
            firstDayOfMonth,
            firstDayOfNextMonth,
            specialDays
        );
        normOfMonth = countOfLabourDays * hoursPerDay;

        countOfRestLabourDays = getCountOfLabourDays(
            moment(),
            firstDayOfNextMonth,
            specialDays
        );
    }

    return {
        normOfMonth,
        countOfRestLabourDays,
    };
};

export const getStaticData = createSelector(
    [getFirstWorkdayOfPeriod, getSpecialDays, getHoursPerDay],
    staticDataHandler
);

export const getWorkStats = createSelector(
    [getWorkdays, getStaticData],
    (workdays, { normOfMonth }) => {
        if (workdays && workdays.length && normOfMonth) {
            const rawRealTime = workdays.reduce(
                accumulateRealTime,
                moment.duration(0)
            );
            const workedMinutes = rawRealTime.asMinutes();
            const restMinutes =
                moment.duration(normOfMonth, "h").asMinutes() - workedMinutes;

            return {
                realTimeMinutes: workedMinutes,
                restOfTimeMinutes: restMinutes,
            };
        } else {
            return {
                realTimeMinutes: 0,
                restOfTimeMinutes: 0,
            };
        }
    }
);