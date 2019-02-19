import { combineReducers } from 'redux'
import authorization, { SELECTORS as AUTHORIZATION } from './authorization/reducer'
import buttonPanel, { SELECTORS as CANDIDATES } from './buttonPanel/reducer'

export default combineReducers({
    authorization,
    buttonPanel
})