import React, { Component } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { BrowserRouter } from 'react-router-dom'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6be3ce',
    alternateTextColor: '#555'
  }
})

const firebaseConfig = {
  apiKey: 'AIzaSyBkKIlHjVgMQhvU7SduoCHbwzgv8QmHfEc',
  authDomain: 'selly-2c78f.firebaseapp.com',
  databaseURL: 'https://selly-2c78f.firebaseio.com',
  projectId: 'selly-2c78f',
  storageBucket: 'selly-2c78f.appspot.com',
  messagingSenderId: '181748382649'
}

const rrfConfig = {
  userProfile: 'users',
  preserveOnLogin: { profile: ['displayName', 'email', 'isLoaded', 'isEmpty'] }
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp(firebaseConfig) // <- new to v2.*.*
// initialize firestore
// firebase.firestore() // <- needed if using firestore

const middleware = [thunk]
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
  applyMiddleware(...middleware)
)(createStore)

const store = createStoreWithFirebase(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
