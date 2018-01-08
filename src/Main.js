import React, { Component } from 'react';
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


export default class Main extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}