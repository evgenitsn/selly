import React, { Component } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import {Link} from 'react-router-dom'

import HomeIcon from 'material-ui/svg-icons/action/home'
import CameraIcon from 'material-ui/svg-icons/image/photo-camera'
import ProfileIcon from 'material-ui/svg-icons/social/person'
import LoginIcon from 'material-ui/svg-icons/action/lock-open'

export default class Footer extends Component {
  render() {
    return (
      <Paper style={styles.footerContainer} zDepth={1}>
        <BottomNavigation>
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/'/>}
            label="Home"
            icon={<HomeIcon/>}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/create'/>}
            label="Create"
            icon={<CameraIcon/>}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/profile'/>}
            label="Profile"
            icon={<ProfileIcon/>}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/login'/>}
            label="Login"
            icon={<LoginIcon/>}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

const styles = {
  footerContainer: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  alignTextOfMenus: {
    textAlign: 'center'
  }
}