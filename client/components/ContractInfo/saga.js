import { takeLatest, put, select, call } from "redux-saga/effects";
import { contractsLoadRoutine } from "./actions";
import { getStudentId } from "../../rootSelectors";
import { getContractsById } from "../../api/contractService";

export default function* contractInfoSaga() {
    yield takeLatest(contractsLoadRoutine.TRIGGER, contractsLoadSaga);
}

function* contractsLoadSaga() {
    try {
        const _id = yield select(getStudentId);

        yield put(contractsLoadRoutine.request());
        const contracts = yield call(getContractsById, _id);

        yield put(contractsLoadRoutine.success({ contracts }));
    } catch (error) {
        yield put(contractsLoadRoutine.failure({ error }));
    }
}
