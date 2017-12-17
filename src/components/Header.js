import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';

export default class Header extends Component {

  handleClick() {
    alert('onClick triggered on the title component');
  }

  render() {
    return (
      <AppBar
        title="SnapGrid PWA"
        onRightIconButtonClick={this.handleClick}
        iconElementLeft={<IconButton><Menu/></IconButton>}
        iconElementRight={<FlatButton label="Save" />}
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
