import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {green800} from 'material-ui/styles/colors'
import {BrowserRouter} from 'react-router-dom'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green800,
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