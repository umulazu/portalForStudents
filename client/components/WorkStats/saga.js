import React from "react";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { statsLoad } from "./actions";
import { getSpecialDays } from "../../api/calendarService";
import { getHoursPerDay } from "../../api/contractService";
import { getStudentId } from "../../rootSelectors";

export default function* workStatsSaga() {
    yield takeLatest(statsLoad.TRIGGER, startSaga);
}

function* startSaga() {
    try {
        yield put(statsLoad.request());

        const specialDays = yield call(getSpecialDays);

        const id = yield select(getStudentId);
        const hoursPerDay = yield call(getHoursPerDay, id);

        yield put(statsLoad.success({ specialDays, hoursPerDay }));
    } catch (error) {
        console.log(error);
        yield put(statsLoad.failure());
    }
}
