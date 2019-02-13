import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    authorized: false,
    username: '',
    isShown: false,
    email: '',
    password: ''
};

const reducer = handleActions(
    {
        [actions.init]: (state) => ({
            ...state,
            authorized: initialState.authorized,
            username: initialState.username,
            isShown: initialState.isShown,
            email: initialState.email,
            password: initialState.password
        }),

        [actions.loginSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            username: payload.username,
            isShown: false,
            email: '',
            password: ''
        }),

        [actions.loginFailure]: (state) => ({
            ...state,
            authorized: false,
            username: '',
            isShown: true,
            email: '',
            password: ''
        }),

        [actions.logoutSuccess]: state => ({
            ...state,
            authorized: false,
            username: '',
            isShown: false,
            email: '',
            password: ''
        }),

        [actions.logoutFailure]: state => ({
            ...state
        }),

        [actions.showForm]: state => ({
            ...state,
            authorized: false,
            username: '',
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
            authorized: false,
            username: '',
            isShown: true,
            email: payload.email,
        }),

        [actions.enterPassword]: (state, {payload}) => ({
            ...state,
            authorized: false,
            username: '',
            isShown: true,
            password: payload.password
        }),

    },
    initialState
);

export default reducer