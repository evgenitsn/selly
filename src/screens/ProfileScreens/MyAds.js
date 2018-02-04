import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate
} from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'
import { Post } from '../../components'
import Loading from '../../components/Loading'
import Link from 'react-router-dom/Link'

class MyAds extends Component {
  render() {
    const { myAds, userId, history } = this.props
    const adsList = isEmpty(myAds)
      ? 'Todo list is empty'
      : Object.keys(myAds).map((key, id) => (
          <Card key={key} id={id} style={styles.card}>
            <CardHeader
              title={myAds[key]['title']}
              subtitle={myAds[key]['category']}
            />
            <CardText>{myAds[key]['price']}</CardText>
          </Card>
        ))
    if (!isLoaded(myAds)) {
      return <Loading />
    }
    return (
      <div style={styles.body}>
        <div>My ads</div>
        {adsList}
      </div>
    )
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
