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
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import { FormTextField, FormSelectField, FormRadioGroup, CreatedAd, Loading } from '../../components'

import validate from '../../validate'
import { green500 } from 'material-ui/styles/colors'

import Dropzone from 'react-dropzone'
import map from 'lodash/map'

const filesPath = 'uploadedFiles'

class EditAd extends Component {
  state = {
    value: null
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
    this.props.firebase
      .uploadFiles(filesPath, files, filesPath)
      .then(r => console.log(r))
  }

  // Deletes file and removes metadata from database
  onFileDelete = (file, key) => {
    // deleteFile(storagePath, dbPath)
    this.props.firebase
      .deleteFile(file.fullPath, `${filesPath}/${key}`)
      .then(r => console.log(r))
  }

  handleChange = (event, index, value) => this.setState({ value })
  // Add Stepper for the ad
  render() {
    const { pristine, submitting, valid } = this.props
    if(!this.props.editableAd){
      return <Loading />
    }
    const {title} = this.props.editableAd
    console.log(title)
    return (
      <div style={styles.body}>
        <div style={styles.root}>
          <h3>Uploaded file(s):</h3>
          <GridList style={styles.gridList} cols={2.2}>
            {map(this.props.uploadedFiles, (file, key) => (
              <GridTile
                key={file.name + key}
                title={file.name}
                titleStyle={styles.titleStyle}
                actionIcon={
                  <IconButton onClick={() => this.onFileDelete(file, key)}>
                    <StarBorder color="#fafafa" />
                  </IconButton>

                }
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                <img src={file.downloadURL} alt={file.name}/>
              </GridTile>
            ))}
          </GridList>
        </div>
        <form style={{ ...styles.flex }}>
          <Dropzone onDrop={this.onFilesDrop}>
            <div>Drag and drop files here or click to select</div>
          </Dropzone>
          <h3>Edit Ad</h3>
          <h4>Details</h4>
          <div style={styles.flex}>
            <Field
              name="title"
              component={FormTextField}
              floatingLabelText="Title"
            />
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
    uploadedFiles: state.firebase.data[filesPath]
  }
}

EditAd = compose( 
  firebaseConnect(props => {
    return [filesPath,
      { path: `ads/${props.match.params.id}`, storeAs: 'editableAd' }
    ]
  }),
  connect(mapStateToProps, {})
)(EditAd)
export default reduxForm({ form: 'Edit', validate })(EditAd)

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
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto'
  },
  titleStyle: {
    color: '#fafafa'
  }
}
