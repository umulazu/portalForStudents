import { handleActions } from "redux-actions";
import {
    init,
    startRoutine,
    finishRoutine,
    loadCurrentDayRoutine,
} from "./actions";
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

        [authorization.logoutRoutine.SUCCESS]: state => ({
            ...state,
            currentDay: null,
        }),
    },
    initialState
);

export default reducer;