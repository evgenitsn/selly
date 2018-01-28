import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'

import { FormTextField, Snackbar } from '../components'
import validate from '../validate'
import Background from '../assets/pattern.png'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    }
  }

  createNewUser = ({ email, password, fullname }) => {
    firebase.createUser(
      { email, password },
      { displayName: fullname, email }
    ).then(res => {
      this.props.reset()
    }).catch(e => {
      this.setState({
        open: true,
        message: e.code
      })
      console.log('Auth Error: ', e)
    })
  }

  handleSubmit = (e) => {
    if(this.props.valid) {
      const {fullname, email, password} = this.props.formValues
      this.createNewUser({email, password, fullname})
    }
  }

  render() {
    const {pristine, submitting, valid} = this.props
    return (
      <div style={{...styles.flex, ...styles.body, justifyContent: 'space-evenly'}}>
        <div style={{...styles.flex}}>
          <h1 style={styles.title}>selly</h1>
        </div>
        <div style={{...styles.flex}}>
          <form style={{...styles.flex}}>
          <div style={styles.registerLabel}>register</div>
            <Field
              name="fullname"
              component={FormTextField}
              floatingLabelText="full name"
              errorStyle={{fontFamily: 'Oxygen', textTransform: 'lowercase'}}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <Field 
              name="email" 
              component={FormTextField} 
              floatingLabelText="email"
              errorStyle={{fontFamily: 'Oxygen', textTransform: 'lowercase'}}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <Field
              name="password"
              type="password"
              component={FormTextField}
              floatingLabelText="password"
              errorStyle={{fontFamily: 'Oxygen', textTransform: 'lowercase'}}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <Field
              name="repeatPassword"
              type="password"
              component={FormTextField}
              floatingLabelText="repeat password"
              errorStyle={{fontFamily: 'Oxygen', textTransform: 'lowercase'}}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <RaisedButton 
              label="Register"
              backgroundColor="#e3fffd"
              labelColor="#0a0a0a"
              style={{...styles.registerButton, borderRadius: 25}}
              buttonStyle={{ borderRadius: 25 }}
              labelStyle={{fontFamily: 'Oxygen', textTransform: 'lowercase'}}
              disabledBackgroundColor = "lightgrey"
              disabledLabelColor = "white"
              disabled={!valid || pristine || submitting}
              onClick={(e) => this.handleSubmit(e)}
            />
          </form>
          <FlatButton 
            containerElement={<Link to='/login'/>}
            labelStyle={{ color: '#fafafa', fontFamily: 'Oxygen', textTransform: 'lowercase'}}
            label="Go to Login"
          />
        </div>
        <Snackbar 
          open={this.state.open}
          message={this.state.message}
          onActionClick={() => this.setState({open: false})}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    formValues: state.form.Register.values
  }
}

Register = connect(mapStateToProps, {})(Register)
export default reduxForm({form: 'Register', validate})(Register)

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    alignItems: 'space-around',
    height: '100vh',
    backgroundImage: `url(${Background}), linear-gradient(180deg, #6BE3CE 0%, #0277A3 100%)`
  },
  registerButton: {
    margin: 12, 
    marginTop: 30,
  },
  registerLabel: {
    fontFamily: 'Oxygen',
    marginBottom: 20,
    fontSize: '1.8em',
    color: '#E3FFFD',
  },
  title: {
    fontFamily: 'Oxygen',
    color: '#E3FFFD',
    fontSize: '4em'
  },
  slogan: {
    marginTop: '2.5em',
    color: '#fafafa'
  },
  inputStyle: {
    color: 'white', fontFamily: 'Oxygen'
  }
}
