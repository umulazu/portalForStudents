import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    startSelected: false,
    startingTime: '',
};

const reducer = handleActions(
    {
        [actions.init]: (state) => ({
            ...state,
            startSelected: initialState.startSelected,
            startingTime: initialState.startingTime,
        }),

        [actions.start]: (state, {payload}) => ({
            ...state,
            startSelected: true,
            startingTime: payload.time
        }),

        [actions.finishSuccess]: state => ({
            ...state,
            startSelected: false,
            startingTime: ''
        }),

        [actions.finishFailure]: state => ({
            ...state,
        }),
    },
    initialState
);

export default reducer