import { all, takeLatest, call, put } from "redux-saga/effects";
import { loginRoutine, logoutRoutine } from "./actions";
import * as service from "../../api/authorizationService";

export default function* authorizationSaga() {
    yield all([
        takeLatest(loginRoutine.TRIGGER, loginSaga),
        takeLatest(logoutRoutine.TRIGGER, logoutSaga),
    ]);
}

function* loginSaga(action) {
    try {
        const { login, password } = action.payload;
        const {userName, studentName} = yield call(service.login, login, password);

        yield put(loginRoutine.success({
            login: userName,
            name: studentName
        }));
    } catch (error) {
        console.log(error);
        yield put(loginRoutine.failure(error));
    }
}

function* logoutSaga() {
    try {
        yield call(service.logout);
        yield put(logoutRoutine.success());
    } catch (error) {
        console.error(error);
        yield put(logoutRoutine.failure({ error }));
    }
}
