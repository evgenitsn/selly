import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { changeNavBarOption } from '../components/Footer-duck'

import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import { Loading } from '../components'


import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';

import Divider from 'material-ui/Divider';

class Profile extends Component {
  logout = () => {
    firebase.logout()
    this.props.changeNavBarOption(0)
    window.location.reload()
  }

  render() {
    if(!this.props.firebase.profile.isLoaded) {
      return <Loading />
    }
    return (
      <div style={styles.body}>
        <div style={styles.profileHeaderContainer}>
          {this.props.firebase.profile.avatarUrl ? 
            <Avatar size={80} src={this.props.firebase.profile.avatarUrl} /> :
            <Avatar size={80} src={require("../assets/Avatar.png")} />
          }
          <div style={{marginLeft: 20, color: '#fafafa'}}>
            <div>{this.props.firebase.profile.displayName}</div>
            <br/>
            <div>{this.props.firebase.profile.email}</div>
          </div>
        </div>
        <div style={styles.container}>
          <List style={{margin: 20, width: '100%', backgroundColor: '#fafafa'}}>
            <ListItem primaryText="My ads" leftIcon={<ContentInbox />} />
            <Divider/>
            <ListItem primaryText="Edit Profile" leftIcon={<ActionGrade />} />
            <Divider/>
            <ListItem 
              onClick={() => this.logout()}
              primaryText="Logout" 
              leftIcon={<ContentSend />} 
            />
          </List>
        </div>
      </div>
    )
    }
  }

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    footer: state.footerReducer
  }
}

export default connect(mapStateToProps, {changeNavBarOption})(Profile)

const styles = {
  body: {
    backgroundColor: '#fafafa',
    height: '100vh',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 48,
    paddingBottom: 80
  },
  container: {
    display: 'flex'
  },
  profileHeaderContainer: {
    padding: 20,
    backgroundColor: '#6be3ce',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  registerButton: {
    margin: 12,
  },
}
