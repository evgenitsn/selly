import React, { Component } from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import {Post} from '../components'
import Loading from '../components/Loading';

class Home extends Component {
  render() {
    const ads = this.props.ads
    const adsList = isEmpty(ads)
      ? 'Todo list is empty'
      : Object.keys(ads).map(
          (key, id) => (
            <Card key={key} id={id} style={styles.card}>
              <CardHeader title={ads[key]['title']} />
              <CardText>{ads[key]['price']}</CardText>
            </Card>
          )
        )
    if(!isLoaded(ads)){
      return <Loading/>
    }
    return (
      <div style={styles.body}>
        {adsList}
      </div>
    )
  }
}

export default compose(
  firebaseConnect(props => [
    { path: 'ads' }
  ]),
  connect((state, props) => ({
    ads: state.firebase.data.ads,
  }))
)(Home)

const styles = {
  body: {
    backgroundColor: '#6BE3CE',
    height: '100vh',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 80,
    paddingBottom: 80,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  }
}
