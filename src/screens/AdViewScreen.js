import React, { Component } from 'react'
import { Loading } from '../components'

export default class AdViewScreen extends Component {
  render() {
    const id = this.props.match.params.id
    return (<div style={styles.container}>{"I am view screen at id " + id}</div>)
  }
}

const styles = {
  container: {
    marginTop: 52
  }
}