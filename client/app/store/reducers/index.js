import { combineReducers } from 'redux'
import userReducer from './userReducer'
import todoReducer from './todoReducer'

const reducers = combineReducers({
    userReducer, todoReducer
})

export default reducers