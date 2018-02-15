import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'
import { Loading, DisplayCard, FormTextField } from '../../components'
import RaisedButton from 'material-ui/RaisedButton'
import validate from '../../validate'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.isLoaded = false
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.profile.isLoaded && !this.isLoaded){
      this.props.initialize(nextProps.profile)
      this.isLoaded = true
    }
  }

  updateProfile(){
    const displayName = {displayName: this.props.formValues.displayName}
    this.props.firebase.updateProfile(displayName).then(() => {
      this.props.history.push('/profile')
    }).catch((e) => {
      console.log(e)
    })
  }

  render() {
    const { pristine, submitting, valid } = this.props
    return (
      <div style={styles.body}>
        <div style={{ ...styles.flex }}>
          <form style={{ ...styles.flex }}>
            <div style={styles.editLabel}>Edit Profile</div>
            <Field
              name="displayName"
              component={FormTextField}
              floatingLabelText="full name"
              errorStyle={{ fontFamily: 'Oxygen'}}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <Field
              name="email"
              component={FormTextField}
              floatingLabelText="email"
              disabled
              errorStyle={{ fontFamily: 'Oxygen'}}
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
  }
}

EditProfile = compose(
  connect(mapStateToProps, {}),
  firebaseConnect()
)(EditProfile)
export default reduxForm({ form: 'EditProfile', validate })(EditProfile)

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
  }
}
