import React, { Component } from 'react'
import Post from './Post'

export default class Header extends Component {
  render() {
    return (
      <div style={styles.body}>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    )
  }
}

const styles = {
  body: {
    marginTop: 80
  }
}
