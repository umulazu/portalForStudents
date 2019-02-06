import { handleActions } from 'redux-actions'
import * as authorization from './actions'

const initialState = {
    authorized: false,
    authorizing: true,
    username: ''
};

const reducer = handleActions(
    {
        [authorization.init]: (state) => ({
            ...state,
            authorizing: initialState.authorizing,
            authorized: initialState.authorized,
            username: initialState.username
        }),

        [authorization.loginSuccess]: (state, {payload}) => ({
            ...state,
            authorizing: false,
            authorized: true,
            username: payload.username
        }),

        [authorization.loginFailure]: (state) => ({
            ...state,
            authorizing: false,
            authorized: false,
            username: '',
        }),

        [authorization.logoutSuccess]: state => ({
            ...state,
            authorizing: false,
            authorized: false,
            username: ''
        }),

        [authorization.logoutFailure]: (state) => ({
            ...state,
            authorizing: false
        }),

        [authorization.enableAuthorizing]: state => ({
            ...state,
            authorizing: true
        })
    },
    initialState
)

export const SELECTORS = {
    AUTHORIZED: state => state.authorized,
    AUTHORIZING: state => state.authorizing,
    USERNAME: state => state.username
};

export default reducer