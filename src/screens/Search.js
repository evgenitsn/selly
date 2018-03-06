import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Loading, DisplayCard } from '../components'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'

import SearchBar from 'material-ui-search-bar'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt
    })
  }

  renderMyAdsList() {
    const ads = this.props.ads
    if (isEmpty(ads)) {
      return 'There is no ads. You can go and create the first one.'
    } else {
      let results = Object.keys(ads).map((key, id) => {
        if (ads[key].title.toLowerCase().includes(this.state.inputValue.toLowerCase())) {
          const navigateParams = { pathname: `/ad/${key}`, state: { ad: { key, details: ads[key] } } }
          return <DisplayCard ads={ads} key={key} adKey={key} onClick={() => this.props.history.push(navigateParams)} />
        }
      })
      results = results.filter(n => n != undefined)
      if(results.length < 1) {
        return <div style={{textAlign: 'center', marginTop: 20}}>No results :(</div>
      } else {
        return results
      }
    }
  }

  render() {
    const { ads } = this.props
    if (!isLoaded(ads)) {
      return <Loading />
    }
    return (
      <div style={styles.body}>
        <SearchBar
          value={this.state.inputValue}
          onRequestSearch={() => null}
          onChange={evt => this.updateInputValue(evt)}
          style={{
            // maxWidth: 800,
            margin: 15
          }}
        />
        {this.state.inputValue !== '' ? this.renderMyAdsList() : null}
      </div>
    )
  }
}

export default compose(
  firebaseConnect(props => [{ path: 'ads' }]),
  connect((state, props) => ({
    ads: state.firebase.data.ads
  }))
)(Search)

const styles = {
  body: {
    backgroundColor: '#6BE3CE',
    overflow: 'auto',
    margin: '0 auto',
    // maxWidth: 500,
    paddingTop: 62,
    paddingBottom: 62,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    height: 'auto',
    width: '100%'
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
