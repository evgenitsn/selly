import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Field, reduxForm } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'

import { FormTextField, FormSelectField, FormRadioGroup } from '../components'

import validate from '../validate'
import { green500 } from 'material-ui/styles/colors'

class Create extends Component {
  state = {
    value: null
  }

  pushSample = () => {
    let data = {
      ...this.props.formValues,
      uid: this.props.firebase.auth.uid,
      createdOn: firebase.database.ServerValue.TIMESTAMP
    }

    firebase.push('ads', data).then(res => {
      this.props.reset()
    })
  }

  uploadFile = e => {
    console.log(e.target.files)
    return firebase.uploadFile(
      'uploadedFiles',
      e.target.files[0],
      'uploadedFiles'
    )
  }

  handleChange = (event, index, value) => this.setState({ value })
  // Add Stepper for the ad
  render() {
    const { pristine, submitting, valid } = this.props
    return (
      <div>
        <form style={{ ...styles.body, ...styles.flex }}>
          <h4>Details</h4>
          <div style={styles.flex}>
            <Field
              name="title"
              component={FormTextField}
              floatingLabelText="Title"
            />
            <Field
              name="category"
              floatingLabelText="Category"
              label="Category"
              value={this.state.value}
              component={FormSelectField}
              onChange={this.handleChange}>
              <MenuItem value={'Cat1'} primaryText="Cat1" />
              <MenuItem value={'Cat2'} primaryText="Cat2" />
              <MenuItem value={'Cat3'} primaryText="Cat3" />
              <MenuItem value={'Cat4'} primaryText="Cat4" />
            </Field>
            <Field
              name="description"
              component={FormTextField}
              floatingLabelText="Description"
              multiLine={true}
              rows={3}
            />
            <Field
              name="price"
              component={FormTextField}
              floatingLabelText="Price"
              type="number"
            />
            <Field name="itemCondition" component={FormRadioGroup}>
              <RadioButton value="new" label="New" />
              <RadioButton value="used" label="Used" />
            </Field>
            <br />
          </div>

          <div style={styles.flex}>
            <h4>Contacts</h4>
            <Field
              name="location"
              component={FormTextField}
              floatingLabelText="Location"
            />
            <Field
              name="contactName"
              component={FormTextField}
              floatingLabelText="Contact Name"
            />
            <Field
              name="contactPhone"
              component={FormTextField}
              floatingLabelText="Phone"
            />
          </div>
          <FlatButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.uploadButton}
            containerElement="label">
            <input
              type="file"
              style={styles.uploadInput}
              onChange={e => this.uploadFile(e)}
            />
          </FlatButton>
          <RaisedButton
            onClick={() => this.pushSample()}
            label="Create"
            disabled={!valid || pristine || submitting}
            disabledBackgroundColor="lightgrey"
            disabledLabelColor="white"
            backgroundColor={green500}
            labelColor="#fafafa"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    formValues: state.form.Create.values
  }
}

Create = compose(
  firebaseConnect(['uploadedFiles']),
  connect(mapStateToProps, {})
)(Create)
export default reduxForm({ form: 'Create', validate })(Create)

const styles = {
  body: {
    margin: '0 auto',
    maxWidth: 500,
    marginTop: 80,
    marginBottom: 80
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  uploadButton: {
    verticalAlign: 'middle'
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
}
