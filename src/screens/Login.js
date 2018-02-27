import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { FormTextField, Snackbar } from '../components'
import validate from '../validate'
import Background from '../assets/pattern.png'
import { firebaseConnect } from 'react-redux-firebase'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: ''
    }
  }
  //SHOW TOAST WITH MSG
  login = ({ email, password }) => {
    this.props.firebase
      .login({ email, password })
      .then(res => {
        this.setState({
          open: true,
          message: 'Logged in.'
        })
        this.props.reset()
        this.props.history.push('/')
      })
      .catch(e => {
        this.setState({
          open: true,
          message: e.code
        })
        if (e.code === 'auth/user-not-found') {
          console.log('There is no user record corresponding to this identifier. The user may have been deleted.')
        } else {
          console.log('Unexpected Error: ', e)
        }
      })
  }

  googleLogin = () => {
    this.props.firebase
      .login({ provider: 'google', type: 'popup' })
      .then(res => { 
        this.setState({
          open: true,
          message: 'Logged in.'
        })
        this.props.history.push('/')
       
      })
      .catch(e => {
        this.setState({
          open: true,
          message: e.code
        })
        if (e.code === 'auth/user-not-found') {
          console.log('There is no user record corresponding to this identifier. The user may have been deleted.')
        } else {
          console.log('Unexpected Error: ', e)
        }
      })
  }

  handleSubmit = e => {
    if (this.props.valid) {
      const { email, password } = this.props.formValues
      this.login({ email, password })
    }
  }

  render() {
    const { pristine, submitting, valid } = this.props
    return (
      <div
        style={{
          ...styles.flex,
          ...styles.body,
          justifyContent: 'space-evenly'
        }}
      >
        <div style={{ ...styles.flex }}>
          <h1 style={styles.title}>selly</h1>
        </div>
        <div style={{ ...styles.flex }}>
          <form style={{ ...styles.flex, ...styles.form }}>
            <div style={styles.loginLabel}>login</div>
            <Field
              name="email"
              component={FormTextField}
              floatingLabelText="email"
              errorStyle={{ fontFamily: 'Oxygen', textTransform: 'lowercase' }}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
            <Field
              name="password"
              type="password"
              component={FormTextField}
              floatingLabelText="password"
              errorStyle={{ fontFamily: 'Oxygen', textTransform: 'lowercase' }}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.inputStyle}
            />
          </form>
          <div style={styles.buttonsContainer}>
            <RaisedButton
              label="Login"
              backgroundColor="#e3fffd"
              labelColor="#0a0a0a"
              style={{ ...styles.loginButton, borderRadius: 25 }}
              labelStyle={{ fontFamily: 'Oxygen', textTransform: 'lowercase' }}
              buttonStyle={{ borderRadius: 25 }}
              disabledBackgroundColor="lightgrey"
              disabledLabelColor="white"
              disabled={!valid || pristine || submitting}
              onClick={e => this.handleSubmit(e)}
            />
            <RaisedButton
              label="Google"
              backgroundColor="#df4a32"
              labelColor="#fafafa"
              style={{ ...styles.loginButton, borderRadius: 25 }}
              labelStyle={{ fontFamily: 'Oxygen', textTransform: 'lowercase' }}
              buttonStyle={{ borderRadius: 25 }}
              onClick={() => this.googleLogin()}
            />
          </div>
          <FlatButton
            containerElement={<Link to="/register" />}
            labelStyle={{
              color: '#fafafa',
              fontFamily: 'Oxygen',
              textTransform: 'lowercase'
            }}
            label="Join us"
          />
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          onActionClick={() => this.setState({ open: false })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formValues: state.form.Login.values
  }
}

Login = compose(connect(mapStateToProps, {}), firebaseConnect())(Login)
export default reduxForm({ form: 'Login', validate })(Login)

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
  loginButton: {
    margin: 12,
    width: 60,
    marginTop: 10
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
    marginBottom: 20,
    fontSize: '1.8em',
    color: '#E3FFFD'
  },
  form: {
    padding: '5%',
    borderRadius: 5
  },
  inputStyle: {
    color: 'white',
    fontFamily: 'Oxygen'
  },
  buttonsContainer: {
    display: 'flex'
  }
}
