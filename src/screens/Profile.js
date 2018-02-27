import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { changeNavBarOption } from '../components/Footer-duck'
import { Loading, Snackbar } from '../components'

import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentSend from 'material-ui/svg-icons/content/send'
import Divider from 'material-ui/Divider'

import Dropzone from 'react-dropzone'
const filesPath = 'avatars'

class Profile extends Component {

  state = {
    dialogOpen: false,
    snackbarOpen: false,
    message: ''
  }

  logout = () => {
    this.props.firebase.logout()
    this.props.changeNavBarOption(0)
  }

  onFilesDrop = files => {
    // uploadFiles(storagePath, files, dbPath)
    this.props.firebase
      .uploadFiles(filesPath, files, filesPath)
      .then(r => {
        let downloadUrl = r[0].File.downloadURL
        this.props.firebase
          .updateProfile({ avatarUrl: downloadUrl })
          .then(r => {
            this.setState({
              open: true,
              message: "Avatar is updated."
            })
          })
          .catch(e => {
            this.setState({
              open: true,
              message: e.code
            })
          })
      })
      .catch(e => {
        this.setState({
          open: true,
          message: e.code
        })
      })
  }

  handleOpen = () => {
    this.setState({ dialogOpen: true })
  }

  handleClose = () => {
    this.setState({ dialogOpen: false })
  }

  render() {
    const logoutDialogActions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Yes, bye" primary={true} onClick={() => this.logout()} />
    ]
    if (!this.props.profile.isLoaded) {
      return <Loading />
    }
    return (
      <div style={styles.body}>
        <div style={styles.profileHeaderContainer}>
          {this.props.profile.avatarUrl ? (
            <Avatar size={80} src={this.props.profile.avatarUrl} />
          ) : (
            <Dropzone onDrop={this.onFilesDrop} style={styles.dropzone}>
              <Avatar size={80} src={require('../assets/Avatar.png')} />
            </Dropzone>
          )}
          <div style={{ marginLeft: 20, color: '#fafafa' }}>
            <div>{this.props.profile.displayName}</div>
            <br />
            <div>{this.props.profile.email}</div>
          </div>
        </div>
        <div style={styles.container}>
          <List style={{ margin: 20, width: '100%', backgroundColor: '#fafafa' }}>
            <ListItem
              primaryText="My ads"
              leftIcon={<ContentInbox />}
              onClick={() => this.props.history.push('/profile/myads')}
            />
            <Divider />
            <ListItem
              primaryText="Edit Profile"
              leftIcon={<ActionGrade />}
              onClick={() => this.props.history.push('/profile/edit')}
            />
            <Divider />
            <ListItem onClick={() => this.handleOpen()} primaryText="Logout" leftIcon={<ContentSend />} />
          </List>
        </div>
        <Dialog
          title="Logout"
          actions={logoutDialogActions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={e => this.handleClose()}
        >
          Are you sure you wanna logout?
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.message}
          customStyle={{marginBottom:50}}
          onActionClick={() => this.setState({ snackbarOpen: false })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    footer: state.footerReducer,
    uploadedFiles: state.firebase.data[filesPath]
  }
}

export default compose(connect(mapStateToProps, { changeNavBarOption }), firebaseConnect([filesPath]))(Profile)

const styles = {
  body: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
    height: 'auto',
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 52
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
    margin: 12
  },
  dropzone: {
    height: 'auto',
    width: 'auto'
  }
}
