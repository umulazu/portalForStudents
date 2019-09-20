import { handleActions } from "redux-actions";
import {
    init,
    startRoutine,
    finishRoutine,
    loadCurrentDayRoutine,
} from "./actions";
import {
    workdaysLoad,
} from "../WorkdaysContainer/actions";
import moment from "moment";
import * as authorization from "../Authorization/actions";

const initialState = {
    currentDay: null,
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [loadCurrentDayRoutine.REQUEST]: state => ({
            ...state,
        }),
        [loadCurrentDayRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: payload.currentDay,
        }),
        [loadCurrentDayRoutine.FAILURE]: state => ({
            ...state,
        }),

        [startRoutine.REQUEST]: state => ({
            ...state,
        }),
        [startRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: payload.currentDay
        }),
        [startRoutine.FAILURE]: state => ({
            ...state,
        }),

        [finishRoutine.REQUEST]: state => ({
            ...state,
        }),
        [finishRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: payload.currentDay
        }),
        [finishRoutine.FAILURE]: state => ({
            ...state,
        }),

        [workdaysLoad.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: getLastDayFromWorkdays(payload.workdays),
        }),

        [authorization.logoutRoutine.SUCCESS]: state => ({
            ...state,
            currentDay: null,
        }),
    },
    initialState
);

export default reducer;

const getLastDayFromWorkdays = (workdays) => {
    const lastWorkday = workdays[workdays.length - 1];
    if (!lastWorkday) {
        return null;
    }
    const lastWorkDate = moment(lastWorkday.startTime).format("YYYYMMMMD");
    const currentDate = moment().format("YYYYMMMMD");
    if (lastWorkDate === currentDate) {
        return lastWorkday;
    } else {
        return null;
    }
};