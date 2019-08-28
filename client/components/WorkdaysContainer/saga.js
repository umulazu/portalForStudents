import React from "react";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { workdaysLoad } from "./actions";
import { getDetailedWorkdaysForMonth } from "../../api/mongoService";
import { getStudentId } from "../../rootSelectors";

export default function* statusTableSaga() {
    yield takeLatest(workdaysLoad.TRIGGER, startSaga);
}

function* startSaga() {
    try {
        const _id = yield select(getStudentId);
        yield put(workdaysLoad.request());
        const workdays = yield call(getDetailedWorkdaysForMonth, _id);

        yield put(workdaysLoad.success({ workdays }));
    } catch (error) {
        console.error(error);
        yield put(workdaysLoad.failure());
    }
}
