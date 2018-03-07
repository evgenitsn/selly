import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Loading, DisplayCard } from '../components'
import { Card, CardHeader, CardText } from 'material-ui/Card'

class Saved extends Component {
  renderMyAdsList() {
    const { savedItemsIDsByUser, allAds } = this.props
    if (isEmpty(savedItemsIDsByUser)) {
      return 'Todo list is empty. Please create UX Component for that'
    } else {
      return Object.keys(savedItemsIDsByUser).map((keyo, id) => {
        return Object.entries(allAds).map(([key, value]) => {
          if (key === savedItemsIDsByUser[keyo].adId) {
            const navigateParams = { pathname: `/ad/${key}`, state: { ad: { key, details: value } } }
            return (
              <Card key={key} style={styles.card} onClick={() => this.props.history.push(navigateParams)}>
                <CardHeader title={value.title} />
                <CardText>
                  <p>Category: {value.category}</p>
                  <p>Price: {value.price}</p>
                  <p>Location: {value.location}</p>
                  <p>Contact: {value.contactName}</p>
                </CardText>
              </Card>
            )
          }
        })
      })
    }
  }

  render() {
    console.log(this.props)
    const { savedItemsIDsByUser, allAds, userId } = this.props
    if (!isLoaded(savedItemsIDsByUser)) {
      return <Loading />
    }
    if(!isLoaded(allAds)) {
      return <Loading />
    }
    if(!isLoaded(userId)) {
      return <Loading />
    }
    return <div style={styles.body}>{this.renderMyAdsList()}</div>
  }
}

const populates = [{ child: 'adId', root: 'ads' }]

const mapStateToProps = state => ({
  allAds: state.firebase.data.ads,
  savedItemsIDsByUser: state.firebase.data.savedItemsByUser,
  userId: state.firebase.auth.uid
})

export default compose(
  connect(mapStateToProps),
  firebaseConnect(props => {
    return [
      { path: `users/${props.userId}/saved`, storeAs: 'savedItemsByUser' },
      { path: `ads` }
    ]
  })
)(Saved)

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
  card: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
}
