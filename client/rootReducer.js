import { combineReducers } from 'redux'
import application from './applicationReducer'
import authorization from './authorization/reducer'
import buttonPanel from './buttonPanel/reducer'

export default combineReducers({
    application,
    authorization,
    buttonPanel
})