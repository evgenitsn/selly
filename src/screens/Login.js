import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {Link} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'

import {FormTextField} from '../components'
import validate from '../validate'

class Login extends Component {
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
          <form style={{...styles.flex}}>
            <Field
              name="username"
              component={FormTextField}
              floatingLabelText="Username"
              floatingLabelStyle={{color: '#fafafa'}}
            />
            <Field
              name="password"
              type="password"
              component={FormTextField}
              floatingLabelText="Password"
              floatingLabelStyle={{color: '#fafafa'}}
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
    auth: state.firebase.auth,
    profile: state.firebase.profile,
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
