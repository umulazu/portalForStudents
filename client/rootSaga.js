/*mport { all } from 'redux-saga/effects'
import applicationSaga from './applicationSaga'
import authorizationSaga from './authorization/saga'

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            applicationSaga({ history }),
            authorizationSaga(),
        ])
    }

    return rootSaga()
};

export default creator*/