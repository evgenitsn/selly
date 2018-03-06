import React, { Component } from 'react'

export default class CreatedAd extends Component {
  render() {
    return (
      <div style={styles.body}>
        <p>Created Successfully</p>
      </div>
    )
  }
}

const styles = {
  body: {
    height: '100vh',
    margin: '0 auto',
    // maxWidth: 500,
    paddingTop: 55
  }
}