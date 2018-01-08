import React, { Component, Fragment } from 'react'
import {Header, Footer} from './components'
import {Home, Create, Profile} from './screens'
import {Route} from 'react-router-dom'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Route path="/" exact component={Home}/>
        <Route path="/create" exact component={Create}/>
        <Route path="/profile" exact component={Profile}/>
        <Footer/>
      </Fragment>
    )
  }
}
