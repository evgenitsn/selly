import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchBar from 'material-ui-search-bar'

export default class Search extends Component {
  render() {
    return (
      <div style={styles.body}>
        <SearchBar
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
            maxWidth: 800,
            margin: 15
          }}
        />
      </div>
    )
  }
}

const styles = {
  body: {
    backgroundColor: '#6BE3CE',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 52,
    minHeight: '100%',
    height: 'auto',
  },
  profileHeaderContainer: {
    padding: 20,
    height: '15vh',
    backgroundColor: 'lightgrey',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
