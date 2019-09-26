import moment from "moment";

export const accumulateRealTime = (prev, cur) => {
    if (moment(cur.startTime).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) {
        return moment.duration(prev.add(moment.duration(cur.realTime)));
    } else {
        return moment.duration(prev.add(moment.duration(0)));
    }
};

export const getCountOfLabourDays = (
    firstDayOfPeriod,
    lastDayOfPeriod,
    specialDays
) => {
    let countOfLabourDays = 0;
    let currentDay = firstDayOfPeriod;
    const lastDayOfPeriodFormatted = lastDayOfPeriod.format("YYYY-MM-DD");
    while (currentDay.format("YYYY-MM-DD") !== lastDayOfPeriodFormatted) {
        if (
            (currentDay.day() &&
                currentDay.day() < 6 &&
                !specialDays.holidays.includes(
                    currentDay.format("YYYY-MM-DD")
                )) ||
            specialDays.postponedDays.includes(currentDay.format("YYYY-MM-DD"))
        ) {
            countOfLabourDays++;
        }
        currentDay.add(1, "day");
    }
    return countOfLabourDays;
};