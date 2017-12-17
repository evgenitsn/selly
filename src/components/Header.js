import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const menuIcon = <IconButton><MenuIcon/></IconButton>;
const saveButton = <FlatButton label="Save" />;

export default class Header extends Component {

  handleClick() {
    alert('onClick triggered on the title component');
  }

  render() {
    return (
      <AppBar
        title="SnapGrid PWA"
        onRightIconButtonClick={this.handleClick}
        iconElementLeft={menuIcon}
        iconElementRight={saveButton}
        style={styles.headerContainer}
      />
    )
  }
}

const styles = {
  headerContainer: {
    position: 'fixed',
    width: '100%',
    top: 0,
    overflow: 'hidden'
  }
}
