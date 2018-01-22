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
    const adsList = !isLoaded(ads)
    ? <Loading/>
    : isEmpty(ads)
      ? 'Todo list is empty'
      : Object.keys(ads).map(
          (key, id) => (
            <Card key={key} id={id}>
              <CardHeader title={ads[key]['title']} />
              <CardText>{ads[key]['price']}</CardText>
            </Card>
          )
        )
    return (
      <div style={styles.body}>
        {adsList}
        {/* <Post 
          username='Username' 
          date='Now' 
          avatar={require('../assets/Avatar.png')}
          image={require('../assets/Sofia.jpg')}
          description='This is Sofia.'
        />
        <Post 
          username='Username' 
          date='Now' 
          avatar={require('../assets/Avatar.png')}
          image={require('../assets/Varna.jpg')}
          description='This is Varna.'
        />
        <Post 
          username='Username' 
          date='Now' 
          avatar={require('../assets/Avatar.png')}
          image={require('../assets/Plovdiv.jpg')}
          description='This is Plovdiv.'
        />*/}
        <RaisedButton
          style={{margin: 20, alignSelf: 'center'}}
          label="Add" 
          backgroundColor="#9575CD"
          labelColor="#fafafa"
        /> 
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
    margin: '0 auto',
    maxWidth: 500,
    marginTop: 80,
    marginBottom: 80,
    display: 'flex',
    flexDirection: 'column'
  }
}
