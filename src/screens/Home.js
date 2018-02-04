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
      return Object.keys(ads).map((key, id) => (
        <DisplayCard ads={ads} key={key} adKey={key} />
      ))
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
  connect(state => ({ ads: state.firebase.data.ads })),
  firebaseConnect([{ path: 'ads' }])
)(Home)

const styles = {
  body: {
    backgroundColor: '#6BE3CE',
    overflow: 'auto',
    height: '100vh',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 80,
    paddingBottom: 150,
    display: 'flex',
    flexDirection: 'column'
  }
}
