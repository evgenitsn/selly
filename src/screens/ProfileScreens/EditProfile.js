import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'
import { Loading, FormTextField, Snackbar } from '../../components'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import validate from '../../validate'

import Dropzone from 'react-dropzone'
const filesPath = 'avatars'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.isLoaded = false
    this.state = {
      snackbarOpen: false,
      dialogOpen: false,
      message: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.isLoaded && !this.isLoaded) {
      this.props.initialize(nextProps.profile)
      this.isLoaded = true
    }
  }

  updateProfile() {
    const displayName = { displayName: this.props.formValues.displayName }
    this.props.firebase
      .updateProfile(displayName)
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch(e => {
        console.log(e)
        this.setState({
          snackbarOpen: true,
          message: e.code
        })
      })
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
              snackbarOpen: true,
              message: 'Avatar is updated.'
            })
          })
          .catch(e => {
            this.setState({
              snackbarOpen: true,
              message: e.code
            })
          })
      })
      .catch(e => {
        this.setState({
          snackbarOpen: true,
          message: e.code
        })
      })
  }

  resetPassword() {
    console.log(this.props.profile.email)
    this.props.firebase
      .resetPassword(this.props.profile.email)
      .then(r => {
        this.setState({
          snackbarOpen: true,
          message: 'Password is resetted.'
        })
        console.log(r, 'success')
      })
      .catch(e => {
        this.setState({
          snackbarOpen: true,
          message: e.code
        })
        console.log(e)
      })
  }

  handleOpen = () => {
    this.setState({ dialogOpen: true })
  }

  handleClose = () => {
    this.setState({ dialogOpen: false })
  }

  render() {
    const resetDialogActions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Reset" primary={true} onClick={e => this.resetPassword(e)} />
    ]
    const { pristine, submitting, valid } = this.props
    if (!this.props.profile.isLoaded) {
      return <Loading />
    }
    return (
      <div style={styles.body}>
        <div style={{ ...styles.flex }}>
          <form style={{ ...styles.flex }}>
            <div style={styles.editLabel}>edit profile</div>
            <Dropzone onDrop={this.onFilesDrop} style={styles.dropzone}>
              {this.props.profile.avatarUrl ? (
                <Avatar size={100} src={this.props.profile.avatarUrl} />
              ) : (
                <Avatar size={100} src={require('../../assets/Avatar.png')} />
              )}
              <p style={styles.editProfilePhoto}>change avatar</p>
            </Dropzone>
            <Field
              name="displayName"
              component={FormTextField}
              floatingLabelText="full name"
              errorStyle={{ fontFamily: 'Oxygen' }}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <Field
              name="email"
              component={FormTextField}
              floatingLabelText="email"
              disabled
              errorStyle={{ fontFamily: 'Oxygen' }}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <RaisedButton
              label="Update Profile"
              backgroundColor="#e3fffd"
              labelColor="#0a0a0a"
              labelStyle={{ fontFamily: 'Oxygen' }}
              disabledBackgroundColor="lightgrey"
              disabledLabelColor="white"
              disabled={!valid || pristine || submitting}
              onClick={e => this.updateProfile(e)}
            />
            <br />
            <RaisedButton
              label="Reset Password"
              backgroundColor="#e3fffd"
              labelColor="#0a0a0a"
              labelStyle={{ fontFamily: 'Oxygen' }}
              onClick={e => this.handleOpen()}
            />
            <Dialog
              title="Reset Password"
              actions={resetDialogActions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={e => this.handleClose()}
            >
              You will be logged out and an email with reset password instructions will be send to you.
            </Dialog>
            <Snackbar
              open={this.state.snackbarOpen}
              message={this.state.message}
              customStyle={{marginBottom:50}}
              onActionClick={() => this.setState({ snackbarOpen: false })}
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formValues: state.form.EditProfile.values,
    profile: state.firebase.profile,
    uploadedFiles: state.firebase.data[filesPath]
  }
}

EditProfile = compose(connect(mapStateToProps, {}), firebaseConnect([filesPath]))(EditProfile)
export default reduxForm({ form: 'EditProfile', validate })(EditProfile)

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
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editLabel: {
    fontFamily: 'Oxygen',
    marginBottom: 20,
    fontSize: '1.8em',
    color: '#E3FFFD'
  },
  inputStyle: {
    color: 'white',
    fontFamily: 'Oxygen'
  },
  dropzone: {
    height: 'auto',
    width: 'auto'
  },
  editProfilePhoto: {
    color: 'white',
    fontFamily: 'Oxygen'
  }
}
