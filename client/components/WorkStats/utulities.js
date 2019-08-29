import moment from "moment";

export const getWorkStats = (workdays, normOfMonth) => {
    const rawRealTime = workdays.reduce(accumulateRealTime, moment.duration(0));
    const workedMinutes = rawRealTime.asMinutes();
    const restMinutes =
        moment.duration(normOfMonth, "h").asMinutes() - workedMinutes;

    return {
        realTimeMinutes: !workdays && !workdays.length ? 0 : workedMinutes,
        restOfTimeMinutes: !workdays && !workdays.length ? 0 : restMinutes,
    };
};

export const accumulateRealTime = (prev, cur) => {
    if (moment(cur.startTime).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) {
        return moment.duration(prev.add(moment.duration(cur.realTime)));
    } else {
        return moment.duration(prev.add(moment.duration(0)));
    }
};