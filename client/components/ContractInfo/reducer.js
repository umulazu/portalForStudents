import { handleActions } from "redux-actions";
import {
    init,
    contractsLoadRoutine,
    contractsCloseRoutine
} from "./actions";
import * as authorization from "../Authorization/actions";

const initialState = {
    contracts: []
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [contractsLoadRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            contracts: payload.contracts,
        }),

        [contractsLoadRoutine.FAILURE]: state => ({
            ...state,
            contracts: [],
        }),

        [contractsCloseRoutine]: state => ({
            ...state,
            contracts: [],
        }),

        [authorization.logoutRoutine.SUCCESS]: state => ({
            ...state,
            contracts: []
        }),
    },
    initialState
);

export default reducer;