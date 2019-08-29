export const getCountOfRestLabourDays = state =>
    state.workStats.countOfRestLabourDays;

export const getFirstWorkdayOfPeriod = state =>
    state.workdaysContainer.workdays.length
        ? state.workdaysContainer.workdays[0].startTime
        : null;

export const getNormOfMonth = state => state.workStats.normOfMonth;