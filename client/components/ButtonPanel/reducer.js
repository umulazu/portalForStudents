import { handleActions } from "redux-actions";
import { init, startRoutine, finishRoutine } from "./actions";
import { workdaysContainerClose, workdaysLoad } from "../WorkdaysContainer/actions";
import moment from "moment";

const initialState = {
    startSelected: false,
    currentDay: null,
};

const reducer = handleActions(
    {
        [init]: () => ({
            ...initialState,
        }),

        [startRoutine.REQUEST]: state => ({
            ...state,
            startSelected: true,
        }),
        [startRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: payload.currentDay
        }),
        [startRoutine.FAILURE]: state => ({
            ...state,
            startSelected: false,
        }),

        [finishRoutine.REQUEST]: state => ({
            ...state,
            startSelected: false,
        }),
        [finishRoutine.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: payload.currentDay
        }),
        [finishRoutine.FAILURE]: state => ({
            ...state,
            startSelected: true,
        }),

        [workdaysLoad.SUCCESS]: (state, { payload }) => ({
            ...state,
            currentDay: getLastDayFromWorkdays(payload.workdays),
            startSelected: !isLastStartFinished(payload.workdays),
        }),
        [workdaysContainerClose.SUCCESS]: state => ({
            ...state,
            startSelected: false,
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

const isLastStartFinished = (workdays) => {
    const currentDay = getLastDayFromWorkdays(workdays);

    if (currentDay) {
        const timestamps = currentDay.timestamps;
        return !!timestamps[timestamps.length - 1].finishTime;
    } else {
        return true;
    }
};