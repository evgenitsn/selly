import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { firebaseConnect } from 'react-redux-firebase'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { green500 } from 'material-ui/styles/colors'

class Create extends Component {
  state = {
    value: null,
  };

  pushSample = () => {
    const adObj = {
      title: 'Galaxy S8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non lacus fermentum lectus placerat pulvinar sed a ante. Duis quis leo ipsum. Morbi in neque urna. Donec consectetur arcu quis sem malesuada, vestibulum posuere odio semper. Aenean in risus quis enim interdum venenatis at nec nibh. Nam lacinia scelerisque nulla nec pretium. Duis sit amet lorem eget tortor cursus mollis ultricies in nulla. Curabitur luctus dui ut elementum sagittis. Donec mi nunc, ultrices vel convallis ut, fringilla aliquet magna. Nulla facilisi. In sagittis tempus pharetra. In quis ligula rhoncus, rutrum mauris eget, tincidunt orci. Morbi consequat dui vel mauris faucibus, ac aliquet eros commodo.',
      price: 600,
      category: 'Mobile Phones',
      condition: 'new',
      location: 'Sofia',
      contactName: 'Evgeni',
      contactPhone: '0889232323',
      user: {
        uid: this.props.firebase.auth.uid,
        email: this.props.firebase.auth.email,
        displayName: this.props.firebase.auth.displayName,
      }
    }

    firebase.push('ads', adObj)
  }

  uploadFile = (e) => {
    console.log(e.target.files)
    return firebase.uploadFile('uploadedFiles', e.target.files[0], 'uploadedFiles')
  }

  handleChange = (event, index, value) => this.setState({value});
  // Add Stepper for the ad
  render() {
    return (
      <div style={{...styles.body, ...styles.flex}}>
        <h4>Details</h4>
        <div style={styles.flex}>
          <TextField
            floatingLabelText="Title"
          />
          <SelectField
            floatingLabelText="Category"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={'Cat1'} primaryText="Cat1" />
            <MenuItem value={'Cat2'} primaryText="Cat2" />
            <MenuItem value={'Cat3'} primaryText="Cat3" />
            <MenuItem value={'Cat4'} primaryText="Cat4" />
          </SelectField>
          <TextField
            floatingLabelText="Description"
            multiLine={true}
            rows={3}
          />
        </div>
        <div style={styles.flex}>
          <h4>Contacts</h4>
          <TextField
            floatingLabelText="Location"
          />
          <TextField
            floatingLabelText="Contact Name"
          />
          <TextField
            floatingLabelText="Email"
          />
          <TextField
            floatingLabelText="Phone"
          />
        </div>
        <FlatButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.uploadButton}
          containerElement="label"
        >
          <input type="file" style={styles.uploadInput} onChange={(e) => this.uploadFile(e)} />
        </FlatButton>
        <RaisedButton
          onClick={() => this.pushSample()}
          label="Create" 
          backgroundColor={green500}
          labelColor="#fafafa"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase
  }
}

export default compose(firebaseConnect(['uploadedFiles']), connect(mapStateToProps, {}))(Create)

const styles = {
  body: {
    margin: '0 auto',
    maxWidth: 500,
    marginTop: 80,
    marginBottom: 80,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
}
