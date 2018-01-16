import React, { Component } from 'react'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'

export default class Profile extends Component {
  logout = () => {
    firebase.logout().then(() => {
      // this.props.history.push('/login')
    })
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.profileHeaderContainer}>
            <Avatar size={80} src={require("../assets/Avatar.png")} />
        </div>
        <div style={styles.container}>
          <RaisedButton 
            label="Log Out" 
            backgroundColor="#9575CD"
            labelColor="#fafafa"
            style={styles.registerButton} 
            onClick={() => this.logout()}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  body: {
    marginTop: 48,
    marginBottom: 80
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileHeaderContainer: {
      padding: 20,
      height: '15vh',
      backgroundColor: 'lightgrey',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  registerButton: {
    margin: 12, 
    marginTop: 30,
  },
}
