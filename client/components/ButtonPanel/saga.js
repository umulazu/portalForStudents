import { all, takeLatest, call, put, select } from "redux-saga/effects";
import { startRoutine, finishRoutine, loadCurrentDayRoutine } from "./actions";
import { start, finish, getCurrentDay } from "../../api/timeService";
import { getStudentId } from "../../rootSelectors";

export default function* buttonPanelSaga() {
    yield all([
        takeLatest(loadCurrentDayRoutine.TRIGGER, loadCurrentDaySaga),
        takeLatest(finishRoutine.TRIGGER, finishSaga),
        takeLatest(startRoutine.TRIGGER, startSaga),
    ]);
}

function* finishSaga() {
    try {
        const _id = yield select(getStudentId);

        yield put(finishRoutine.request());
        const currentDay = yield call(finish, _id);

        yield put(finishRoutine.success({ currentDay }));
    } catch (error) {
        console.error(error);
        yield put(finishRoutine.failure());
    }
}

function* startSaga() {
    try {
        const _id = yield select(getStudentId);

        yield put(startRoutine.request());
        const currentDay = yield call(start, _id);

        yield put(startRoutine.success({ currentDay }));
    } catch (error) {
        console.error(error);
        yield put(startRoutine.failure());
    }
}

function* loadCurrentDaySaga() {
    try {
        const _id = yield select(getStudentId);

        yield put(loadCurrentDayRoutine.request());

        const currentDay = yield call(getCurrentDay, _id);
        yield put(loadCurrentDayRoutine.success({ currentDay }));
    } catch (error) {
        console.error(error);
        yield put(loadCurrentDayRoutine.failure());
    }
}