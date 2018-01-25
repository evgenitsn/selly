import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {FormTextField, Snackbar} from '../components'
import validate from '../validate'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    };
  }
  //SHOW TOAST WITH MSG
  login = ({email, password}) => {
    firebase.login({email, password})
      .then(res => this.props.reset())
      .catch(e => {
        this.setState({
          open: true,
          message: e.code
        })
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
        this.setState({
          open: true,
          message: e.code
        })
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
          <h1 style={styles.title}>selly</h1>
        </div>
        <div style={{...styles.flex, marginTop: '6em'}}>
          <div style={styles.loginLabel}>login</div>
          <form style={{...styles.flex, ...styles.form}}>
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
          </form>
          
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
          <RaisedButton 
            label="Google" 
            backgroundColor="#9575CD"
            labelColor="#fafafa"
            style={styles.loginButton}
            onClick={() => this.googleLogin()}
          />
        <FlatButton 
          containerElement={<Link to='/register'/>}
          labelStyle={{color:"#fafafa"}}
          label="Join us"
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
    backgroundImage: 'linear-gradient(180deg, #6BE3CE 0%, #0277A3 100%)'
  },
  loginButton: {
    margin: 12, 
    width: 60,
    marginTop: 10,
  },
  welcomeMsg: {
    fontSize: '1.5em', 
    marginBottom: '0.9em', 
    color: '#fafafa'
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
  loginLabel: {
    fontFamily: 'Oxygen',
    width: '75%',
    marginBottom: 20,
    fontSize: '1.8em',
    color: '#E3FFFD',
  },
  form: {
    backgroundColor: 'rgba(227, 255, 253, 0.50)',
    padding: '5%',
    borderRadius: 5
  }
}
