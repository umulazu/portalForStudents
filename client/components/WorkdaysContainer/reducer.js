import { handleActions } from "redux-actions";
import { init, workdaysLoad, workdaysContainerClose } from "./actions";
import { finishRoutine, startRoutine } from "../ButtonPanel/actions";
import moment from "moment";

const initialState = {
    workdays: [],
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [workdaysLoad.REQUEST]: state => ({
            ...state,
        }),
        [workdaysLoad.SUCCESS]: (state, { payload }) => ({
            ...state,
            workdays: payload.workdays,
        }),
        [workdaysLoad.FAILURE]: state => ({
            ...state,
        }),

        [workdaysContainerClose]: state => ({
            ...state,
            workdays: [],
        }),

        [startRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            workdays: newWorkdays(state.workdays, payload.currentDay)
        }),
        [finishRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            workdays: newWorkdays(state.workdays, payload.currentDay)
        }),
    },
    initialState
);

export default reducer;

const newWorkdays = (workdays, currentDay) => {
    const lastWorkDay = workdays[workdays.length - 1];
    const lastWorkDate = moment(lastWorkDay && lastWorkDay.startTime).format("YYYYMMMMD");
    const currentDate = moment(currentDay.startTime).format("YYYYMMMMD");
    if (lastWorkDate === currentDate) {
        return [...workdays.slice(0, -1), currentDay];
    } else {
        return [...workdays, currentDay];
    }
};