import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { footerReducer } from './components/Footer-duck'
import { headerReducer } from './components/Header-duck'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  footerReducer,
  headerReducer,
  form: formReducer,
  firebase: firebaseReducer
})

export default rootReducer