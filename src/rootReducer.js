import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { footerReducer } from './components/Footer-duck'

const rootReducer = combineReducers({
  footerReducer,
  firebase: firebaseReducer,
})

export default rootReducer