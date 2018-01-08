import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div style={styles.body}>
        <h1>Welcome</h1>
      </div>
    )
  }
}

const styles = {
  body: {
    marginTop: 64,
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'center'
  }
}
