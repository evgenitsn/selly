import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

import MenuIcon from 'material-ui/svg-icons/navigation/menu'

const menuIcon = (
  <IconButton>
    <MenuIcon />
  </IconButton>
)

class Header extends Component {
  handleClick() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <AppBar
        title={this.props.headerTitle}
        onTitleClick={this.handleClick}
        iconElementLeft={menuIcon}
        showMenuIconButton={false}
        style={styles.headerContainer}
        titleStyle={styles.titleStyle}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    headerTitle: state.headerReducer.headerTitle,
  }
}

export default connect(mapStateToProps)(Header)

const styles = {
  headerContainer: {
    position: 'fixed',
    width: '100%',
    height: 52,
    top: 0,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    // maxWidth: 500
  },
  titleStyle: {
    fontFamily: 'Oxygen',
    textAlign: 'center',
    lineHeight: '46px'
  }
}
