import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <div style={styles.body}>
        SEARCH
      </div>
    )
  }
}

const styles = {
  body: {
    margin: '0 auto',
    maxWidth: 500,
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
