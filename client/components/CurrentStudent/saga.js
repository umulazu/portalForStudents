import { all, takeLatest, call, put } from "redux-saga/effects";
import { loadStudentRoutine } from "./actions";
import { getStudent }from "../../api/studentInfoService";

export default function* studentInfoSaga() {
    yield all([
        takeLatest(loadStudentRoutine, startSaga)
    ]);
}

function* startSaga(action) {
    try {
        const { login } = action.payload;

        const {mentor, birthday} = yield call(getStudent, login);

        yield put(loadStudentRoutine.success({
            mentor,
            birthday
        }));
    } catch (error) {
        yield put(loadStudentRoutine.failure({ error }));
    }
}