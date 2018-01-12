import React, { Component } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import {Link} from 'react-router-dom'

import HomeIcon from 'material-ui/svg-icons/action/home'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'
import ProfileIcon from 'material-ui/svg-icons/social/person'
import SearchIcon from 'material-ui/svg-icons/action/search'
import LoginIcon from 'material-ui/svg-icons/action/lock-open'

export default class Footer extends Component {

  state = {
    selectedIndex: 0,
  };

  componentWillMount() {
    this.initialNavBarSelectedItem()
  }

  initialNavBarSelectedItem() {
    let index = 0
    switch(window.location.pathname) {
      case '/search':
        index = 1
        break
      case '/create':
        index = 2
        break
      case '/profile':
        index = 3
        break
    }
    this.select(index)
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper style={styles.footerContainer} zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/'/>}
            label="Home"
            icon={<HomeIcon/>}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/search'/>}
            label="Search"
            icon={<SearchIcon/>}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/create'/>}
            label="Create"
            icon={<AddIcon/>}
            onClick={() => this.select(2)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/profile'/>}
            label="Profile"
            icon={<ProfileIcon/>}
            onClick={() => this.select(3)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to='/login'/>}
            label="Login"
            icon={<LoginIcon/>}
            onClick={() => this.select(4)}
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
    width: '100%',
    height: '50px',
    zIndex: 9999
  },
  alignTextOfMenus: {
    textAlign: 'center'
  }
}