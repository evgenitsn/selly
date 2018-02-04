import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Loading, DisplayCard } from '../../components'

class MyAds extends Component {
  renderMyAdsList() {
    const myAds = this.props.myAds
    if (isEmpty(myAds)) {
      return 'Todo list is empty. Please create UX Component for that'
    } else {
      return Object.keys(myAds).map((key, id) => (
        <DisplayCard ads={myAds} key={key} adKey={key} />
      ))
    }
  }

  render() {
    const { myAds } = this.props
    if (!isLoaded(myAds)) {
      return <Loading />
    }
    return <div style={styles.body}>{this.renderMyAdsList()}</div>
  }
}

export default compose(
  connect(state => ({
    myAds: state.firebase.data['myAds'],
    userId: state.firebase.auth.uid
  })),
  firebaseConnect(props => {
    return [
      {
        path: '/ads',
        storeAs: 'myAds',
        queryParams: ['orderByChild=user', `equalTo=${props.userId}`]
      }
    ]
  })
)(MyAds)

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
  },
  card: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
}
