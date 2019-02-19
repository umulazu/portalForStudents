import { all } from 'redux-saga/effects'
import authorizationSaga from './authorization/saga'
import buttonPanelSaga from './buttonPanel/saga'

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            buttonPanelSaga({ history }),
        ])
    }

    return rootSaga()
}

export default creator