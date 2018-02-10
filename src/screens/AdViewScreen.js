import React, { Component } from 'react'
import { Loading } from '../components'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

export default class AdViewScreen extends Component {
  render() {
    console.log(this.props)
    let { category, contactName, createdOn, description, itemCondition, location, price, title, contactPhone } = this.props.location.state.ad.details
    return (
      <div style={styles.outerContainer}>
        
        <div style={styles.innerContainer}>
          <Paper style={styles.paper} zDepth={1}>
            <div>
              <h1 style={styles.title}>{title}</h1>
              <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: 10}}>
                <h2 style={styles.price}>{price + ' лв.'}</h2>
                <div>{new Date(createdOn).toDateString()}</div>
              </div>
            </div>
            <div style={styles.chipsContainer}>
              <Chip
                backgroundColor={'#e2e1ff'}
                style={styles.chip} >
                {'Category: ' + category}
              </Chip>
              <Chip
                backgroundColor={itemCondition ? '#e2e1ff' : '#EF9A9A'}
                style={styles.chip} >
                {itemCondition ? 'New' : 'Used'}
              </Chip>
            </div>
          </Paper>
          <Paper style={styles.paper} zDepth={1}>
            <img style={styles.image} src={require('../assets/Varna.jpg')}/>
          </Paper>
          <Paper style={styles.paper} zDepth={1}>
            <div>{'Description: ' + description}</div>
            <br/>
            <div>{'Location: ' + location}</div>
            <br/>
            <div>{'Contacts: ' + contactName}</div>
            <br/>
            <div>{'Phone: ' + contactPhone}</div>
          </Paper>
        </div>
      </div>
    )
  }
}

const styles = {
  outerContainer: {
    paddingTop: 52,
    width: '100%',
    backgroundColor: '#6BE3CE',
    height: '100%',
    overflow: 'auto'
  },
  innerContainer: {
    margin: '0 auto',
    marginTop: 20,
    width: '98%'
  },
  paper: {
    padding: 20,
    width: '100%'
  },
  image: {
    width: '100%'
  },
  title: {
    fontWeight: '500'
  },
  price: {
    color: '#FF5252',
    fontWeight: '400'
  },
  chip: {
    margin: 4
  },
  chipsContainer: {
    paddingTop: 15, 
    paddingBottom: 5, 
    display: 'flex',
    justifyContent: 'space-between'
  }
}