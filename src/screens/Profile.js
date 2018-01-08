import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar';

export default class Profile extends Component {
  render() {
    return (
      <div style={styles.body}>
        <div style={styles.profileHeaderContainer}>
            <Avatar size={80} src="https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react/react.png" />
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
