import { all } from "redux-saga/effects";
import authorizationSaga from "./components/Authorization/saga";
import buttonPanelSaga from "./components/ButtonPanel/saga";
import workdaysContainerSaga from  "./components/WorkdaysContainer/saga";
import workStatsSaga from "./components/WorkStats/saga";
import studentInfoSaga from "./components/CurrentStudent/saga";
import contractInfoSaga from "./components/ContractInfo/saga";

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            buttonPanelSaga({ history }),
            workdaysContainerSaga(),
            workStatsSaga(),
            studentInfoSaga(),
            contractInfoSaga(),
        ]);
    }

    return rootSaga();
};

export default creator;
