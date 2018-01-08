import React, { Component } from 'react'
import {Post} from '../components'

export default class Home extends Component {
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

const styles = {
  body: {
    marginTop: 80,
    marginBottom: 80
  }
}
