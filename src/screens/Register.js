import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'

import {FormTextField, Loading} from '../components'
import validate from '../validate'

class Register extends Component {
  createNewUser = ({ email, password, fullname }) => {
    firebase.createUser(
      { email, password },
      { displayName: fullname, email }
    ).then(res => {
      this.props.reset()
    }).catch(e => {
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
      <div style={{...styles.flex, ...styles.body}}>
        <div style={{...styles.flex}}>  
          <h2 style={styles.welcomeMsg}>Register to</h2>
          <h1 style={styles.title}>Selly</h1>
        </div>
        <div style={{...styles.flex, marginTop: '1em'}}>
          <form style={{...styles.flex}}>
            <Field
              name="fullname"
              component={FormTextField}
              floatingLabelText="Full Name"
              floatingLabelStyle={{color: '#fafafa'}}
            />
            <Field 
              name="email" 
              component={FormTextField} 
              floatingLabelText="Email"
              floatingLabelStyle={{color: '#fafafa'}}
            />
            <Field
              name="password"
              type="password"
              component={FormTextField}
              floatingLabelText="Password"
              floatingLabelStyle={{color: '#fafafa'}}
            />
            <Field
              name="repeatPassword"
              type="password"
              component={FormTextField}
              floatingLabelText="Repeat Password"
              floatingLabelStyle={{color: '#fafafa'}}
            />
            <RaisedButton 
              label="Register" 
              backgroundColor="#9575CD"
              labelColor="#fafafa"
              style={styles.registerButton} 
              disabledBackgroundColor = "lightgrey"
              disabledLabelColor = "white"
              disabled={!valid || pristine || submitting}
              onClick={(e) => this.handleSubmit(e)}
            />
          </form>
          <FlatButton 
            containerElement={<Link to='/login'/>}
            labelStyle={{color:"#fafafa"}}
            label="Go to Login"
          />
        </div>
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
    backgroundImage: 'linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%)'
  },
  registerButton: {
    margin: 12, 
    marginTop: 30,
  },
  welcomeMsg: {
    fontSize: '1.5em', 
    marginBottom: '0.9em', 
    color: '#fafafa'
  },
  title: {
   fontFamily: 'Pacifico',
   color: '#555',
   fontSize: '4em'
  },
  slogan: {
    marginTop: '2.5em',
    color: '#fafafa'
  }
}
