import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeNavBarOption } from './Footer-duck'

import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import { Link } from 'react-router-dom'

import HomeIcon from 'material-ui/svg-icons/action/home'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'
import ProfileIcon from 'material-ui/svg-icons/social/person'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import SearchIcon from 'material-ui/svg-icons/action/search'

class Footer extends Component {
  render() {
    return (
      <Paper style={styles.footerContainer} zDepth={1}>
        <BottomNavigation selectedIndex={this.props.selectedOption}>
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to="/" />}
            label="Home"
            icon={<HomeIcon />}
            onClick={() => this.props.changeNavBarOption(0)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to="/search" />}
            label="Search"
            icon={<SearchIcon />}
            onClick={() => this.props.changeNavBarOption(1)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to="/create" />}
            label="Create"
            icon={<AddIcon />}
            onClick={() => this.props.changeNavBarOption(2)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to="/saved" />}
            label="Saved"
            icon={<StarIcon />}
            onClick={() => this.props.changeNavBarOption(3)}
          />
          <BottomNavigationItem
            style={styles.alignTextOfMenus}
            containerElement={<Link to="/profile" />}
            label="Profile"
            icon={<ProfileIcon />}
            onClick={() => this.props.changeNavBarOption(4)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedOption: state.footerReducer.selectedOption
  }
}

export default connect(mapStateToProps, { changeNavBarOption })(Footer)

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
