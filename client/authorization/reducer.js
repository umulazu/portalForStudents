import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    isShown: false,
    email: '',
    password: ''
};

const reducer = handleActions(
    {
        [actions.init]: (state) => ({
            ...state,
            isShown: initialState.isShown,
            email: initialState.email,
            password: initialState.password
        }),

        [actions.loginSuccess]: (state) => ({
            ...state,
            isShown: false,
            email: '',
            password: ''
        }),

        [actions.loginFailure]: (state) => ({
            ...state,
            isShown: true,
            email: '',
            password: ''
        }),

        [actions.logoutSuccess]: state => ({
            ...state,
            isShown: false,
            email: '',
            password: ''
        }),

        [actions.logoutFailure]: state => ({
            ...state
        }),

        [actions.showForm]: state => ({
            ...state,
            isShown: true,
            email: '',
            password: ''
        }),

        [actions.hideForm]: state => ({
            ...state,
            isShown: false,
            email: '',
            password: ''
        }),

        [actions.enterEmail]: (state, {payload}) => ({
            ...state,
            username: '',
            isShown: true,
            email: payload.email,
        }),

        [actions.enterPassword]: (state, {payload}) => ({
            ...state,
            username: '',
            isShown: true,
            password: payload.password
        }),

    },
    initialState
);

export default reducer