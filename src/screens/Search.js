import React, { Component } from 'react'

import SearchBar from 'material-ui-search-bar'

export default class Search extends Component {
  render() {
    return (
      <div style={styles.body}>
        <SearchBar
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
            margin: '0 auto',
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
    height: '100vh',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 55
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
