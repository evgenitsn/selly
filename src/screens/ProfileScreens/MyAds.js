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
      return Object.keys(myAds).map((key, id) => {
        const navigateParams = { pathname: `/ad/${key}`, state: { ad: { key, details: myAds[key] } } }
        return (
          <DisplayCard ads={myAds} key={key} adKey={key} onClick={() => this.props.history.push(navigateParams)}/>
        )
      })
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

const mapStateToProps = state => ({
  myAds: state.firebase.data['myAds'],
  userId: state.firebase.auth.uid
})

export default compose(
  connect(mapStateToProps),
  firebaseConnect(props => {
    return [
      {
        path: '/ads',
        storeAs: 'myAds',
        queryParams: ['orderByChild=uid', `equalTo=${props.userId}`]
      }
    ]
  })
)(MyAds)

const styles = {
  body: {
    backgroundColor: '#6BE3CE',
    overflow: 'auto',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 62,
    paddingBottom: 62,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    height: 'auto',
    width: '100%'
  },
  card: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
}
