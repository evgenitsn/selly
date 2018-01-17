import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {Home, Create, Profile, Login, Register, Search} from './screens'
import { Loading, Header, Footer } from './components'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    if(this.props.firebase.auth.isEmpty && this.props.firebase.auth.isLoaded){
      return (
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Redirect to="/login"/>
        </Switch>
      )
    } else if(!this.props.firebase.auth.isEmpty && this.props.firebase.auth.isLoaded) {
      return (
        <Fragment>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/create" exact component={Create}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/search" exact component={Search}/>
            <Redirect to="/"/>
          </Switch>
          <Footer/>
        </Fragment>
      )
    } else {
      return <Loading/>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase
  }
}

export default withRouter(connect(mapStateToProps, {})(App))