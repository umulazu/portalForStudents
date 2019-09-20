import { handleActions } from "redux-actions";
import {
    init,
    loadStudentRoutine
} from "./actions";
import * as authorization from "../Authorization/actions";

const initialState = {
    mentor: "",
    birthday: ""
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [loadStudentRoutine.REQUEST]: state => ({
            ...state,
        }),

        [loadStudentRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            mentor: payload.mentor,
            birthday: payload.birthday
        }),

        [loadStudentRoutine.FAILURE]: state => ({
            ...state,
        }),

        [authorization.logoutRoutine.SUCCESS]: state => ({
            ...state,
            mentor: "",
            birthday: ""
        }),
    },
    initialState
);

export default reducer;