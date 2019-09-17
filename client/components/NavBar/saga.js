import { takeLatest, put } from "redux-saga/effects";
import { changePageRoutine } from "./actions";

export default function* authorizationSaga() {
    yield takeLatest(changePageRoutine, changePageSaga);
}

function* changePageSaga(action) {
    try {
        const { index } = action.payload;

        yield put(changePageRoutine.success({
            pageNumber: index
        }));
    } catch (error) {
        yield put(changePageRoutine.failure({ error }));
    }
}
