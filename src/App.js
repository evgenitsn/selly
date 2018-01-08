import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import Create from './screens/Create'
import Profile from './screens/Profile'
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
