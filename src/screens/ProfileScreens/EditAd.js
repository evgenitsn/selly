import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'

import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import { GridList, GridTile } from 'material-ui/GridList'
import { FlatButton } from 'material-ui'

import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { green500 } from 'material-ui/styles/colors'

import { FormTextField, FormSelectField, FormRadioGroup, CreatedAd, Loading } from '../../components'

import validate from '../../validate'

import Dropzone from 'react-dropzone'
import map from 'lodash/map'

const filesPath = 'uploadedFiles'

class EditAd extends Component {
  state = {
    value: null
  }

  componentWillMount() {
    this.props.initialize(this.props.editableAd)
  }

  pushSample = () => {
    let data = {
      ...this.props.formValues,
      updatedOn: this.props.firebase.database.ServerValue.TIMESTAMP
    }

    this.props.firebase.update(`ads/${this.props.match.params.id}`, data).then(res => {
      this.props.history.push(`/ad/${this.props.match.params.id}`)
      this.props.reset()
    })
  }

  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop = files => {
    console.log(files)
    // uploadFiles(storagePath, files, dbPath)
    this.props.firebase.uploadFiles(filesPath, files, filesPath).then(r => console.log(r))
  }

  renderFileTile = (file, key) => {
    return (
      <GridTile
        key={file + key}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        <img src={file} alt={'image'} />
      </GridTile>
    )
  }

  renderFilesPreview = () => {
    if (this.props.editableAd.downloadUrls && this.props.editableAd.downloadUrls.length > 0) {
      return (
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {this.props.editableAd.downloadUrls.map((file, key) => this.renderFileTile(file, key))}
          </GridList>
        </div>
      )
    } else {
      return <div style={{ textAlign: 'center', marginBottom: '30px' }}>No images added.</div>
    }
  }

  handleChange = (event, index, value) => this.setState({ value })
  // Add Stepper for the ad
  render() {
    const { pristine, submitting, valid } = this.props
    if (!this.props.editableAd) {
      return <Loading />
    }
    const { title } = this.props.editableAd
    if (this.props.profileUid !== this.props.editableAd.uid) {
      this.props.history.push(`/ad/${this.props.match.params.id}`)
    }
    return (
      <div style={styles.body}>
        <form>
          <div style={styles.flex}>
            <h3>Edit Ad</h3>
            <h4>Details</h4>

            <div style={styles.flex}>
              <Field name="title" component={FormTextField} floatingLabelText="Title" />
              <Field
                name="category"
                floatingLabelText="Category"
                label="Category"
                value={this.state.value}
                component={FormSelectField}
                onChange={this.handleChange}
              >
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
              <Field name="price" component={FormTextField} floatingLabelText="Price" type="number" />
              <Field name="itemCondition" component={FormRadioGroup}>
                <RadioButton value={true} label="New" />
                <RadioButton value={false} label="Used" />
              </Field>
              <br />
            </div>
            <div style={styles.flex}>
              <h4>Images</h4>
            </div>
          </div>

          {this.renderFilesPreview()}
          <div style={styles.flex}>
            <div style={styles.flex}>
              <h4>Contacts</h4>
              <Field name="location" component={FormTextField} floatingLabelText="Location" />
              <Field name="contactName" component={FormTextField} floatingLabelText="Contact Name" />
              <Field name="contactPhone" component={FormTextField} floatingLabelText="Phone" />
            </div>
            <RaisedButton
              onClick={() => this.pushSample()}
              label="Update"
              disabled={!valid || pristine || submitting}
              disabledBackgroundColor="lightgrey"
              disabledLabelColor="white"
              backgroundColor={green500}
              labelColor="#fafafa"
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    firebaseAuth: state.firebase.auth,
    formValues: state.form.Edit.values,
    editableAd: state.firebase.data['editableAd'],
    profileUid: state.firebase.auth.uid
  }
}

EditAd = compose(
  firebaseConnect(props => {
    return [filesPath, { path: `ads/${props.match.params.id}`, storeAs: 'editableAd' }]
  }),
  connect(mapStateToProps, {})
)(EditAd)
export default reduxForm({ form: 'Edit', validate })(EditAd)

const styles = {
  body: {
    margin: '0 auto',
    // maxWidth: 500,
    paddingTop: 80,
    paddingBottom: 80,
    minHeight: '100%',
    height: 'auto',
    width: '100%'
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
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 40
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto'
  },
  titleStyle: {
    color: '#fafafa'
  },
  dropzone: {
    height: 30,
    width: 'auto',
    backgroundColor: 'orange'
  }
}
