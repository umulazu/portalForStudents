import { handleActions } from "redux-actions";
import * as application from "./applicationActions";
import * as authorization from "./components/Authorization/actions";

const initialState = {
    authorized: false,
    login: "",
};

const reducer = handleActions(
    {
        [application.init]: () => ({
            ...initialState,
        }),

        [authorization.loginRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            authorized: true,
            login: payload.login,
        }),

        [authorization.logoutRoutine.SUCCESS]: state => ({
            ...state,
            authorized: false,
            login: "",
        }),
    },
    initialState
);

export default reducer;