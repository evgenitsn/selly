import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const setupReducer = (state = { }, action) => state

const rootReducer = combineReducers({
  setupReducer,
  firebase: firebaseReducer,
})

export default rootReducer