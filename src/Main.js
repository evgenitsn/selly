import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {grey50} from 'material-ui/styles/colors'
import {BrowserRouter} from 'react-router-dom'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey50,
    alternateTextColor: '#555'
  }
});

const middleware = [ thunk ]

const store = createStore(reducers, applyMiddleware(...middleware))

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}