import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

import { green500 } from 'material-ui/styles/colors';

export default class Create extends Component {
  state = {
    value: null,
  };

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
        <RaisedButton
          label="Create" 
          backgroundColor={green500}
          labelColor="#fafafa"
        />
      </div>
    )
  }
}

const styles = {
  body: {
    marginTop: 80,
    marginBottom: 80,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}
