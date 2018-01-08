import React, { Component, Fragment } from 'react'
import {Header, Footer} from '../components'
import {Post} from '../components'

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
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
        <Footer/>
      </Fragment>
    )
  }
}

const styles = {
  body: {
    marginTop: 80,
    marginBottom: 80
  }
}
