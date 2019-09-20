import { handleActions } from "redux-actions";
import { init, statsLoad, statsClose } from "./actions";

const initialState = {
    normOfMonth: 0,
    countOfRestLabourDays: 0,
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [statsLoad.REQUEST]: state => ({
            ...state,
        }),
        [statsLoad.SUCCESS]: (state, { payload }) => ({
            ...state,
            normOfMonth: payload.normOfMonth,
            countOfRestLabourDays: payload.countOfRestLabourDays,
        }),
        [statsLoad.FAILURE]: state => ({
            ...state,
        }),

        [statsClose]: state => ({
            ...state,
            normOfMonth: 0,
            countOfRestLabourDays: 0,
        }),
    },
    initialState
);

export default reducer;
