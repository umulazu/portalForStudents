import { handleActions } from "redux-actions";
import {
    init,
    loginRoutine,
    logoutRoutine,
    hideForm,
    showForm,
    enterLogin,
    enterPassword,
} from "./actions";

const initialState = {
    isShown: false,
    displayedLogin: "",
    name: "",
    password: "",
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [loginRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            isShown: false,
            displayedLogin: payload.login,
            name: payload.name,
            password: "",
        }),

        [loginRoutine.FAILURE]: state => ({
            ...state,
            isShown: true,
            name: "",
            password: "",
        }),

        [logoutRoutine.SUCCESS]: state => ({
            ...state,
            isShown: false,
            name: "",
            displayedLogin: "",
            password: "",
        }),

        [logoutRoutine.FAILURE]: state => ({
            ...state,
        }),

        [showForm]: state => ({
            ...state,
            isShown: true,
            name: "",
            password: "",
        }),

        [hideForm]: state => ({
            ...state,
            isShown: false,
            name: "",
            password: "",
        }),

        [enterLogin]: (state, { payload }) => ({
            ...state,
            name: "",
            isShown: true,
            displayedLogin: payload.login,
        }),

        [enterPassword]: (state, { payload }) => ({
            ...state,
            name: "",
            isShown: true,
            password: payload.password,
        }),
    },
    initialState
);

export default reducer;
