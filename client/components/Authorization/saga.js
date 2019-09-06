import { all, takeLatest, call, put } from "redux-saga/effects";
import { loginRoutine, logoutRoutine } from "./actions";
import * as service from "../../api/authorizationService";

export default function* authorizationSaga() {
    yield all([
        takeLatest(loginRoutine, loginSaga),
        takeLatest(logoutRoutine, logoutSaga),
    ]);
}

function* loginSaga(action) {
    try {
        const { login, password } = action.payload;
        const {id, name} = yield call(service.login, login, password);

        yield put(loginRoutine.success({
            login: id,
            name
        }));
    } catch (error) {
        yield put(loginRoutine.failure({ error }));
    }
}

function* logoutSaga() {
    try {
        yield call(service.logout);
        yield put(logoutRoutine.success());
    } catch (error) {
        yield put(logoutRoutine.failure({ error }));
    }
}
