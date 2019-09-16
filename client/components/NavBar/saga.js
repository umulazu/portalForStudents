import { takeLatest, put } from "redux-saga/effects";
import { changePage } from "./actions";

export default function* authorizationSaga() {
    yield takeLatest(changePage, changePageSaga);
}

function* changePageSaga(action) {
    try {
        const { index } = action.payload;

        yield put(changePage.success({
            pageNumber: index
        }));
    } catch (error) {
        yield put(changePage.failure({ error }));
    }
}
