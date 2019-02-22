import { handleActions } from 'redux-actions'
import * as application from './applicationActions'
import * as authorization from './authorization/actions'

const initialState = {
    authorized: false,
    username: '',
}

const reducer = handleActions(
    {
        [application.init]: (state) => ({
            ...state,
            authorized: initialState.authorized,
            username: initialState.username,
        }),

        [authorization.loginSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            username: payload.username,
        }),

        [authorization.logoutSuccess]: (state) => ({
            ...state,
            authorized: false,
            username: '',
        })
    },
    initialState
)

export default reducer