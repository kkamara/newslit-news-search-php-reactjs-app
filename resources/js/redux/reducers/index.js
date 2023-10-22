import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import newsReducer from './newsReducer'

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  news: newsReducer,
})
