/*import { all, takeLatest, put } from 'redux-saga/effects'
import * as actions from './applicationActions'
import getStateArgsFromURL from './utilities/getStateArgsFromURL'

const creator = ({ history }) => {
    function* applicationSaga() {
        yield all([
            watchInit(),
            //watchGetInitialStateFromServer(),
            //watchSearch()
        ])
    }

    function* watchInit() {
        yield takeLatest(actions.init, initSaga)
    }

    function* watchGetInitialStateFromServer() {
        yield takeLatest(actions.getInitialStateFromServer, getInitialStateFromServerSaga)
    }

    function* watchSearch() {
        yield takeLatest(actions.search, searchSaga)
    }

    function* initSaga(action) {
        try {
            const { username } = action.payload;
            const stateArgs = getStateArgsFromURL(history.location.pathname + history.location.search);
            const initialState = {
                ...stateArgs,
                username
            };
            yield put(actions.initSuccess({initialState}))
        }
        catch (error) {
            yield put(actions.setErrorMessage({message: error + '. Initializing error.'}))
        }
    }

    return applicationSaga()
}

export default creator*/