import React from "react";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { workdaysLoad } from "./actions";
import { getDetailedWorkdaysForMonth } from "../../api/studentInfoService";
import { getStudentId } from "../../rootSelectors";

export default function* statusTableSaga() {
    yield takeLatest(workdaysLoad.TRIGGER, loadStatusTableSaga);
}

function* loadStatusTableSaga() {
    try {
        const id = yield select(getStudentId);
        yield put(workdaysLoad.request());
        const workdays = yield call(getDetailedWorkdaysForMonth, id);

        yield put(workdaysLoad.success({ workdays }));
    } catch (error) {
        console.error(error);
        yield put(workdaysLoad.failure());
    }
}
