import React from "react";
import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { workdaysLoad, workdaysContainerClose } from "./actions";
import { getDetailedWorkdaysForMonth } from "../../api/studentInfoService";
import { getStudentId } from "../../rootSelectors";

export default function* statusTableSaga() {
    yield all([
        takeLatest(workdaysLoad.TRIGGER, startSaga),
        takeLatest(workdaysContainerClose.TRIGGER, finishSaga),
    ]);
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

function* finishSaga() {
    try {
        yield put(workdaysContainerClose.request());

        yield put(workdaysContainerClose.success());
    } catch (error) {
        console.error(error);
        yield put(workdaysContainerClose.failure());
    }
}
