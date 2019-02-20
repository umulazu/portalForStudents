import {handleActions} from 'redux-actions'
import * as actions from './actions'
import * as authorization from '../authorization/actions'

const initialState = {
    startSelected: false,
    startingTime: '',
    username: '',
    isShown: false
};

const reducer = handleActions(
    {
        [actions.init]: (state) => ({
            ...state,
            startSelected: initialState.startSelected,
            startingTime: initialState.startingTime,
            username: initialState.username,
            isShown: initialState.isShown
        }),

        [authorization.loginSuccess]: (state, {payload}) => ({
            ...state,
            username: payload.username,
            isShown: true
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

        [authorization.logoutSuccess]: state => ({
            ...state,
            username: '',
            isShown: false
        }),
    },
    initialState
);

export default reducer