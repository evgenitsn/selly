import React, { Component, Fragment } from 'react'
import {Home, Create, Profile, Login, Register} from './screens'
import {Route} from 'react-router-dom'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/" exact component={Home}/>
        <Route path="/create" exact component={Create}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </Fragment>
    )
  }
}
