import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Body/>
        <Footer/>
      </Fragment>
    )
  }
}
