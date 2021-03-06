import { combineReducers } from "redux";
import application from "./applicationReducer";
import authorization from "./components/Authorization/reducer";
import buttonPanel from "./components/ButtonPanel/reducer";
import workdaysContainer from "./components/WorkdaysContainer/reducer";
import workStats from "./components/WorkStats/reducer";
import studentInfo from "./components/CurrentStudent/reducer";
import contractInfo from "./components/ContractInfo/reducer";

export default combineReducers({
    application,
    authorization,
    buttonPanel,
    workdaysContainer,
    workStats,
    studentInfo,
    contractInfo
});
