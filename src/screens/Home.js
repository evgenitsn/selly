import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { DisplayCard, Loading } from '../components'

class Home extends Component {
  renderAdsList() {
    const ads = this.props.ads
    if (isEmpty(ads)) {
      return 'Todo list is empty. Please create UX Component for that'
    } else {
      return Object.keys(ads).map((key, id) => {
        const navigateParams = { pathname: `/ad/${key}`, state: { ad: { key, details: ads[key] } } }
        return (
          <DisplayCard ads={ads} key={key} adKey={key} onClick={() => this.props.history.push(navigateParams)}/>
        )
      })
    }
  }

  render() {
    const { ads } = this.props
    if (!isLoaded(ads)) {
      return <Loading />
    }
    return <div style={styles.body}>{this.renderAdsList()}</div>
  }
}

export default compose(
  connect(state => ({ ads: state.firebase.data.allAds })),
  firebaseConnect([{ path: 'ads', storeAs: 'allAds' }])
)(Home)

const styles = {
  body: {
    backgroundColor: '#6BE3CE',
    overflow: 'auto',
    maxWidth: 500,
    paddingTop: 62,
    paddingBottom: 62,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    height: 'auto',
    width: '100%'
  }
}
