import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const start = createAction('START');

export const finish = createAction('FINISH');

export const finishSuccess = createAction('FINISH_SUCCESS');

export const finishFailure = createAction('FINISH_FAILURE');