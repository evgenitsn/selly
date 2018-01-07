import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Feed from './screens/Feed'
import Create from './screens/Create'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Create/>
        <Footer/>
      </Fragment>
    )
  }
}
