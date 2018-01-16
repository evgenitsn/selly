import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import GoogleButton from 'react-google-button'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {FormTextField} from '../components'
import validate from '../validate'

class Login extends Component {
  //SHOW TOAST WITH MSG
  login = ({email, password}) => {
    firebase.login({email, password})
      .then(res => this.props.reset())
      .catch(e => {
        if(e.code === "auth/user-not-found"){
          console.log('There is no user record corresponding to this identifier. The user may have been deleted.')
        } else {
          console.log('Unexpected Error: ', e)
        }
    })
  }

  googleLogin = () => {
    firebase.login({ provider: 'google', type: 'popup' })
      .then()
      .catch(e => {
        if(e.code === "auth/user-not-found"){
          console.log('There is no user record corresponding to this identifier. The user may have been deleted.')
        } else {
          console.log('Unexpected Error: ', e)
        }
      })
  }

  handleSubmit = (e) => {
    if(this.props.valid) {
      const {email, password} = this.props.formValues
      this.login({email, password})
    }
  }

  render() {
    const {pristine, submitting, valid} = this.props
    return (
      <div style={{...styles.flex, ...styles.body}}>
        <div style={{...styles.flex}}>  
          <h2 style={styles.welcomeMsg}>Welcome to</h2>
          <h1 style={styles.title}>Selly</h1>
          <p style={styles.slogan}>Insert some kind of slogan here.</p>
        </div>
        <div style={{...styles.flex, marginTop: '6em'}}>
        {this.props.firebase.authError ? <div>{this.props.firebase.authError.code}</div>: null}
          <form style={{...styles.flex}}>
            <Field
              name="email"
              component={FormTextField}
              floatingLabelText="Email"
              floatingLabelStyle={{color: '#fafafa'}}
              inputStyle={{color: 'white'}}
            />
            <Field
              name="password"
              type="password"
              component={FormTextField}
              floatingLabelText="Password"
              floatingLabelStyle={{color: '#fafafa'}}
              inputStyle={{color: 'white'}}
            />
            <RaisedButton 
              label="Login" 
              backgroundColor="#9575CD"
              labelColor="#fafafa"
              style={styles.loginButton} 
              disabledBackgroundColor = "lightgrey"
              disabledLabelColor = "white"
              disabled={!valid || pristine || submitting}
              onClick={(e) => this.handleSubmit(e)}
            />
            <GoogleButton
              style={{width: '30%'}}
              onClick={() => this.googleLogin()}
            />
            <FlatButton 
              containerElement={<Link to='/register'/>}
              labelStyle={{color:"#fafafa"}}
              label="Join us"
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    formValues: state.form.Login.values
  }
}

Login = connect(mapStateToProps, {})(Login)
export default reduxForm({form: 'Login', validate})(Login)

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
  loginButton: {
    margin: 12, 
    width: 60,
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
