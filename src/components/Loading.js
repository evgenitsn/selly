import React from 'react'

const Loading = ({message}) => (
  <div style={styles.container}>
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
    <div style={{ marginTop: 20, fontFamily: 'Oxygen', color: '#fafafa' }}>
      {message || 'Processing'}
    </div>
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#6BE3CE',
    // maxWidth: 500,
    width: '100%'
  },
  heading: {
    marginBottom: 40
  }
}

export default Loading
