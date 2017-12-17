import React, { Component } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import RestoreIcon from 'material-ui/svg-icons/action/restore';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';

export default class Footer extends Component {

  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper style={styles.footerContainer} zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Recents"
            icon={<RestoreIcon/>}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={<FavoriteIcon/>}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={<LocationIcon/>}
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