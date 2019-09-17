import { handleActions } from "redux-actions";
import {
    init,
    contractsLoadRoutine
} from "./actions";

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
    },
    initialState
);

export default reducer;