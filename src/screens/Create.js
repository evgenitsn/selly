import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'

import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import { GridList, GridTile } from 'material-ui/GridList'

import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import { FormTextField, FormSelectField, FormRadioGroup, CreatedAd } from '../components'

import validate from '../validate'
import { green500 } from 'material-ui/styles/colors'

import Dropzone from 'react-dropzone'
import map from 'lodash/map'
import { FlatButton } from 'material-ui'

const filesPath = 'uploadedFiles'

class Create extends Component {
  state = {
    value: null,
    success: false,
    selectedFiles: []
  }

  pushSample = () => {
    let data = {
      ...this.props.formValues,
      uid: this.props.firebaseAuth.uid,
      createdOn: this.props.firebase.database.ServerValue.TIMESTAMP,
      downloadUrls: []
    }
    let files = this.state.selectedFiles
    this.props.firebase.uploadFiles(filesPath, files, filesPath).then(uploadedFiles => {
      uploadedFiles.forEach(file => {
        data.downloadUrls.push(file.File.downloadURL)
      })

      this.props.firebase.push('ads', data).then(res => {
        this.setState({ success: true })
        this.props.reset()
      })
    })
  }

  onFilesDrop = files => {
    this.setState({ selectedFiles: [...this.state.selectedFiles, ...files] })
  }

  onFileRemove = file => {
    this.setState({
      selectedFiles: this.state.selectedFiles.filter(e => e.preview !== file.preview)
    })
    // this.props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`).then(r => console.log(r))
  }

  renderFileTile = (file, key) => {
    return (
      <GridTile
        key={file.name + key}
        title={file.name}
        titleStyle={styles.titleStyle}
        actionIcon={
          <IconButton onClick={() => this.onFileRemove(file)}>
            <DeleteIcon color="#fafafa" />
          </IconButton>
        }
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        <img src={file.preview} alt={file.name} />
      </GridTile>
    )
  }

  renderFilesPreview = () => {
    if (this.state.selectedFiles.length > 0) {
      return (
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {this.state.selectedFiles.map((file, key) => this.renderFileTile(file, key))}
          </GridList>
        </div>
      )
    } else {
      return <div>No images added.</div>
    }
  }

  handleChange = (event, index, value) => this.setState({ value })
  // Add Stepper for the ad

  render() {
    console.log(this.state)
    const { pristine, submitting, valid } = this.props
    if (this.state.success) {
      return <CreatedAd />
    }
    return (
      <div style={styles.body}>
        <form>
          <div style={styles.flex}>
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
              <Dropzone accept="image/jpeg, image/png, image/gif" onDrop={this.onFilesDrop} style={{}}>
                <FlatButton label="Choose" color={green500} />
              </Dropzone>
              <br />
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
              label="Create"
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
    formValues: state.form.Create.values,
    uploadedFiles: state.firebase.data[filesPath]
  }
}

Create = compose(firebaseConnect([filesPath]), connect(mapStateToProps, {}))(Create)
export default reduxForm({ form: 'Create', validate })(Create)

const styles = {
  body: {
    margin: '0 auto',
    maxWidth: 500,
    paddingTop: 80,
    paddingBottom: 80,
    minHeight: '100%',
    height: 'auto'
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
    overflowX: 'auto',
  },
  titleStyle: {
    color: '#fafafa'
  }
}
