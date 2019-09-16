import { all } from "redux-saga/effects";
import authorizationSaga from "./components/Authorization/saga";
import buttonPanelSaga from "./components/ButtonPanel/saga";
import workdaysContainerSaga from  "./components/WorkdaysContainer/saga";
import workStatsSaga from "./components/WorkStats/saga";
import studentInfoSaga from "./components/StudentInfo/saga";
import navBarSaga from "./components/NavBar/saga";

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            buttonPanelSaga({ history }),
            workdaysContainerSaga(),
            workStatsSaga(),
            studentInfoSaga(),
            navBarSaga()
        ]);
    }

    return rootSaga();
};

export default creator;
