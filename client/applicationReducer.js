/*import { handleActions } from 'redux-actions'
import * as application from './applicationActions'
import * as authorization from './authorization/actions'

const initialState = {
    initializing: true,
    fetching: false,
    pageTitle: 'Candidate Accounting',
    errorMessage: '',
    searchRequest: '',
}

const reducer = handleActions(
    {
        [application.initSuccess]: (state, {payload}) => ({
            ...state,
            ...initialState,
            searchRequest: payload.initialState.searchRequest ? payload.initialState.searchRequest : initialState.searchRequest
        }),

        [application.enableInitializing]: state => ({
            ...state,
            initializing: true
        }),

        [application.enableFetching]: state => ({
            ...state,
            fetching: true
        }),

        [application.disableFetching]: state => ({
            ...state,
            fetching: false
        }),

        [application.setErrorMessage]: (state, {payload}) => ({
            ...state,
            errorMessage: payload.message
        }),

        [authorization.loginFailure]: (state, {payload}) => ({
            ...state,
            errorMessage: payload.error + '. Login failure.'
        }),

        [authorization.logoutFailure]: (state, {payload}) => ({
            ...state,
            errorMessage: payload.error + '. Logout failure.'
        })
    },
    initialState
);

export const SELECTORS = {
    INITIALIZING: state => state.initializing,
    FETCHING: state => state.fetching,
    PAGETITLE: state => state.pageTitle,
    ERRORMESSAGE: state => state.errorMessage,
}

export default reducer*/