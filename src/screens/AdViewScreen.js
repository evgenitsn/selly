import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Loading } from '../components'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border'
import { red200, blue200 } from 'material-ui/styles/colors'

class AdViewScreen extends Component {
  deleteItem() {
    this.props.firebase.remove(`ads/${this.props.match.params.id}`).then(res => {
      this.props.history.push('/')
    })
  }

  toggleSaved() {
    let adId = this.props.match.params.id
    let isSaved = this.checkSaved()
    if (isSaved) {
      let keyToDelete = this.findKeyToDelete()
      this.props.firebase.remove(`users/${this.props.loggedUserUid}/saved/${keyToDelete}`)
    } else {
      this.props.firebase
        .push(`users/${this.props.loggedUserUid}/saved`, adId)
        .then(r => console.log(r))
        .catch(e => console.log(e))
    }
  }

  findKeyToDelete() {
    let keyToDelete
    this.props.savedItemsByUser.forEach(e => {
      if (e.value === this.props.match.params.id) {
        keyToDelete = e.key
      }
    })
    return keyToDelete
  }

  checkSaved() {
    if (isEmpty(this.props.savedItemsByUser)) {
      return false
    } else {
      let isSaved = false
      this.props.savedItemsByUser.forEach(e => {
        if (e.value === this.props.match.params.id) {
          isSaved = true
        }
      })
      return isSaved
    }
  }

  render() {
    if (!isLoaded(this.props.singleAd)) {
      return <Loading />
    } else {
      let {
        category,
        contactName,
        createdOn,
        description,
        itemCondition,
        location,
        price,
        title,
        contactPhone
      } = this.props.singleAd
      return (
        <div style={styles.outerContainer}>
          <div style={styles.innerContainer}>
            <Paper style={styles.paper} zDepth={1}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
                  <h1 style={styles.title}>{title}</h1>
                  <div>
                    <Checkbox
                      checkedIcon={<StarIcon />}
                      uncheckedIcon={<StarBorderIcon />}
                      style={{ marginBottom: 16 }}
                      checked={this.props.savedItemsByUser !== null ? this.checkSaved() : false}
                      onClick={() => this.toggleSaved()}
                    />
                  </div>
                </div>
                <div style={styles.headerContainer}>
                  <h2 style={styles.price}>{price + ' лв.'}</h2>
                  <div>{new Date(createdOn).toDateString()}</div>
                </div>
              </div>
              <div style={styles.chipsContainer}>
                <Chip backgroundColor={'#e2e1ff'} style={styles.chip}>
                  {'Category: ' + category}
                </Chip>
                <Chip backgroundColor={itemCondition ? '#e2e1ff' : '#EF9A9A'} style={styles.chip}>
                  {itemCondition ? 'New' : 'Used'}
                </Chip>
              </div>
            </Paper>
            <Paper style={styles.paper} zDepth={1}>
              <img style={styles.image} src={require('../assets/Varna.jpg')} />
            </Paper>
            <Paper style={styles.paper} zDepth={1}>
              <div>{'Description: ' + description}</div>
              <br />
              <div>{'Location: ' + location}</div>
              <br />
              <div>{'Contacts: ' + contactName}</div>
              <br />
              <div>{'Phone: ' + contactPhone}</div>
            </Paper>
            {this.props.loggedUserUid === this.props.singleAd.uid ? (
              <Paper style={{ ...styles.paper, display: 'flex', justifyContent: 'center' }} zDepth={1}>
                <RaisedButton onClick={() => this.deleteItem()} label="Delete" backgroundColor={red200} />
                <RaisedButton
                  onClick={() => this.props.history.push(`/ad/${this.props.match.params.id}/edit`)}
                  label="Edit"
                  backgroundColor={blue200}
                />
              </Paper>
            ) : null}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  singleAd: state.firebase.data['singleAd'],
  loggedUserUid: state.firebase.auth.uid,
  savedItemsByUser: state.firebase.ordered.savedItemsByUser
})

export default compose(
  connect(mapStateToProps),
  firebaseConnect(props => {
    if (props.match.params) {
      return [
        {
          path: `ads/${props.match.params.id}`,
          storeAs: 'singleAd'
        },
        {
          path: `users/${props.loggedUserUid}/saved`,
          storeAs: 'savedItemsByUser'
        }
      ]
    }
  })
)(AdViewScreen)

const styles = {
  outerContainer: {
    paddingTop: 62,
    paddingBottom: 62,
    width: '100%',
    backgroundColor: '#6BE3CE',
    overflow: 'auto',
    minHeight: '100%',
    height: 'auto'
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
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10
  }
}
