import { all } from "redux-saga/effects";
import authorizationSaga from "./components/Authorization/saga";
import buttonPanelSaga from "./components/ButtonPanel/saga";
import workdaysContainerSaga from  "./components/WorkdaysContainer/saga";
import workStatsSaga from "./components/WorkStats/saga";

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            buttonPanelSaga({ history }),
            workdaysContainerSaga(),
            workStatsSaga(),
        ]);
    }

    return rootSaga();
};

export default creator;
