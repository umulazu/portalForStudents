import React from "react";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { statsLoad } from "./actions";
import { getSpecialDays } from "../../api/calendarService";
import { getHoursPerDay } from "../../api/contractService";
import { getStudentId } from "../../rootSelectors";
import { getFirstWorkdayOfPeriod} from "./selectors";
import moment from "moment";

export default function* workStatsSaga() {
    yield takeLatest(statsLoad.TRIGGER, startSaga);
}

function* startSaga() {
    try {
        yield put(statsLoad.request());

        const specialDays = yield call(getSpecialDays);

        const _id = yield select(getStudentId);
        const hoursPerDay = yield call(getHoursPerDay, _id);

        const firstWorkdayOfMonth = yield select(getFirstWorkdayOfPeriod);

        let countOfRestLabourDays = 0;
        let normOfMonth = 0;
        if (firstWorkdayOfMonth) {
            const firstDayOfMonth = moment(firstWorkdayOfMonth)
                .startOf("month")
                .add(3, "hours");
            const firstDayOfNextMonth = moment(firstWorkdayOfMonth)
                .endOf("month")
                .add(3, "hours")
                .format("YYYY-MM-DD");
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
        yield put(statsLoad.success({ normOfMonth, countOfRestLabourDays }));
    } catch (error) {
        console.error(error);
        yield put(statsLoad.failure());
    }
}

const getCountOfLabourDays = (firstDayOfPeriod, lastDayOfPeriod, specialDays) => {
    let countOfLabourDays = 0;
    let currentDay = firstDayOfPeriod;
    while (currentDay.format("YYYY-MM-DD") !== lastDayOfPeriod) {
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
