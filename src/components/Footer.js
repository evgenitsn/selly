import React, { Component } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import HomeIcon from 'material-ui/svg-icons/action/home'
import CameraIcon from 'material-ui/svg-icons/image/photo-camera'
import ProfileIcon from 'material-ui/svg-icons/social/person'

export default class Footer extends Component {

  state = {
    selectedIndex: 0,
  }

  select = (index) => this.setState({selectedIndex: index})

  render() {
    return (
      <Paper style={styles.footerContainer} zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Home"
            icon={<HomeIcon/>}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Create"
            icon={<CameraIcon/>}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Profile"
            icon={<ProfileIcon/>}
            onClick={() => this.select(2)}
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
  }
}