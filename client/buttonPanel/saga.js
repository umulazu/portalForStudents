import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { addTime } from '../api/timeService'

export default  function* buttonPanelSaga() {
    yield all([
        watchFinish()
    ])
}

function* watchFinish() {
    yield takeLatest(actions.finish, finishSaga)
}

function* finishSaga(action) {
    try {
        const { username, date, start, finish } = action.payload;
        yield call(username, date, start, finish);
        yield put(actions.finishSuccess());
    }
    catch (error) {
        yield put(actions.finishFailure());//{error}
    }
}