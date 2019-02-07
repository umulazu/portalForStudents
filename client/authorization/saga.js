import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { login, logout } from '../api/authorizationService'

export default  function* authorizationSaga() {
    yield all([
        watchLogin(),
        watchLogout()
    ])
}

function* watchLogin() {
    yield takeLatest(actions.login, loginSaga)
}

function* watchLogout() {
    yield takeLatest(actions.logout, logoutSaga)
}

function* loginSaga(action) {
    try {
        const { email, password } = action.payload;

        yield put(actions.enableAuthorizing());
        const username = yield call(login, email, password);

        yield put(actions.loginSuccess({ username }));
    }
    catch (error) {
        yield put(actions.loginFailure({error}))
    }
}

function* logoutSaga() {
    try {
        yield put(actions.enableAuthorizing());
        yield call(logout);
        yield put(actions.logoutSuccess())
    }
    catch (error) {
        yield put(actions.logoutFailure({error}))
    }
}