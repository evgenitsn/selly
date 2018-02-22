import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, populate, isLoaded, isEmpty } from 'react-redux-firebase'
import { Loading, DisplayCard } from '../components'

class Saved extends Component {
  renderMyAdsList() {
    const {savedItemsByUser} = this.props
    if (isEmpty(savedItemsByUser)) {
      return 'Todo list is empty. Please create UX Component for that'
    } else {
      return Object.keys(savedItemsByUser).map((key, id) => {
        const navigateParams = { pathname: `/ad/${key}`, state: { ad: { key, details: savedItemsByUser[key].adId } } }
        return (
          <div key={id}>{savedItemsByUser[key].adId}</div>
          //<DisplayCard ads={savedItemsByUser} key={key} adKey={key} onClick={() => this.props.history.push(navigateParams)}/>
        )
      })
    }
  }
  

  render() {
    console.log(this.props)
    const { savedItemsByUser } = this.props
    if (!isLoaded(savedItemsByUser)) {
      return <Loading />
    }
    return <div style={styles.body}>{this.renderMyAdsList()}</div>
  }
}

const populates = [
  { child: 'adId', root: 'ads' }
]

const mapStateToProps = state => ({
  savedItemsByUser: state.firebase.profile.saved,
  userId: state.firebase.auth.uid,
})

export default compose(
  connect(mapStateToProps),
  firebaseConnect(props => {
    return [
      {
        path: `users/${props.userId}/saved`,
        storeAs: 'savedItemsByUser',
      },
      { path: `users/${props.userId}/saved`, populates }
    ]
  })
)(Saved)

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
  },
  card: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
}
