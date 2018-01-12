import React, { Component, Fragment } from 'react'
import {Header, Footer} from '../components'

export default class Search extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <div style={styles.body}>
          SEARCH
        </div>
        <Footer/>
      </Fragment>
      
    )
  }
}

const styles = {
  body: {
    marginTop: 64,
    marginBottom: 80
  },
  profileHeaderContainer: {
      padding: 20,
      height: '15vh',
      backgroundColor: 'lightgrey',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
  }
}
