import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const login = createAction('LOGIN');

export const loginSuccess = createAction('LOGIN_SUCCESS');

export const loginFailure = createAction('LOGIN_FAILURE');

export const logout = createAction('LOGOUT');

export const logoutSuccess = createAction('LOGOUT_SUCCESS');

export const logoutFailure = createAction('LOGOUT_FAILURE');

export const showForm = createAction('SHOW_FORM');

export const hideForm = createAction('HIDE_FORM');

export const enterEmail = createAction('ENTER_EMAIL');

export const enterPassword = createAction('ENTER_PASSWORD');