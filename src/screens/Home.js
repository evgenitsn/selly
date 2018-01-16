import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'

import {Post} from '../components'

class Home extends Component {
  render() {
    return (
      <div style={styles.body}>
        <Post 
          username='Username' 
          date='Now' 
          avatar={require('../assets/Avatar.png')}
          image={require('../assets/Sofia.jpg')}
          description='This is Sofia.'
        />
        <Post 
          username='Username' 
          date='Now' 
          avatar={require('../assets/Avatar.png')}
          image={require('../assets/Varna.jpg')}
          description='This is Varna.'
        />
        <Post 
          username='Username' 
          date='Now' 
          avatar={require('../assets/Avatar.png')}
          image={require('../assets/Plovdiv.jpg')}
          description='This is Plovdiv.'
        />
      </div>
    )
  }
}

export default withFirebase(Home)

const styles = {
  body: {
    marginTop: 80,
    marginBottom: 80
  }
}
