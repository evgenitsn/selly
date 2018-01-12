import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'


class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault()
  }

  createNewUser = ({ email, password, username }) => {
    firebase.createUser(
      { email, password },
      { username, email }
    ).then(res => console.log(res))
  }

  render() {
    console.log(this.props)
    return (
      <div style={{...styles.flex, ...styles.body}}>
        <div style={{...styles.flex}}>  
          <h2 style={styles.welcomeMsg}>Register to</h2>
          <h1 style={styles.title}>Selly</h1>
        </div>
        <div style={{...styles.flex, marginTop: '1em'}}>
          <TextField
            name="username"
            floatingLabelText="Username"
            floatingLabelStyle={{color: '#fafafa'}}
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextField          
            name="email"
            floatingLabelText="Email"
            floatingLabelStyle={{color: '#fafafa'}}
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            name="password"
            type="password"
            floatingLabelText="Password"
            floatingLabelStyle={{color: '#fafafa'}}
            value={this.state.password}
            onChange={this.handleChange}
          />
          <TextField
            name="repeatPassword"
            type="password"
            floatingLabelText="Repeat Password"
            floatingLabelStyle={{color: '#fafafa'}}
            value={this.state.repeatPassword}
            onChange={this.handleChange}
          />
          
          <RaisedButton 
            containerElement={<Link to='/'/>}
            label="Register" 
            backgroundColor="#9575CD"
            labelColor="#fafafa"
            style={styles.registerButton} 
            onClick={(e) => this.handleSubmit(e)}
          />
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
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, {})(Register)

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
