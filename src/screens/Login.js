import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'

export default class Login extends Component {
  render() {
    return (
      <div style={styles.body}>
        <h1 style={styles.title}>Welcome</h1>
        <RaisedButton 
          containerElement={<Link to='/'/>}
          label="Skip" 
          backgroundColor="#a4c639"
          style={styles.skipButton} 
        />
      </div>
    )
  }
}

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundImage: 'linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%)'
  },
  skipButton: {
    margin: 12, 
    width: 60,
    marginBottom: 60
  },
  title: {
    color: 'white',
    paddingTop: 100
  }
}
