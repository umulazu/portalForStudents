import { handleActions } from "redux-actions";
import { init, statsLoad, statsClose } from "./actions";

const initialState = {
    specialDays: 0,
    hoursPerDay: 0,
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
            specialDays: payload.specialDays,
            hoursPerDay: payload.hoursPerDay,
        }),
        [statsLoad.FAILURE]: state => ({
            ...state,
        }),

        [statsClose]: state => ({
            ...state,
            specialDays: 0,
            hoursPerDay: 0,
        }),
    },
    initialState
);

export default reducer;
