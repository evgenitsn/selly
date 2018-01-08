import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar';

export default class Profile extends Component {
  render() {
    return (
      <div style={styles.body}>
        <div style={styles.profileHeaderContainer}>
            <Avatar size={80} src={require("../assets/Avatar.png")} />
        </div>
      </div>
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
