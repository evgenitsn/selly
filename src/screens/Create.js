import React, { Component } from 'react'
import Webcam from 'react-webcam'

export default class Feed extends Component {
  state = {
    imageSrc: ''
  }
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    this.setState({imageSrc: imageSrc})
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.webcamContainer}>
          <Webcam
            audio={false}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={300}
            height={250}
          />
        </div>
        <button onClick={this.capture}>Capture photo</button>
        <img alt="Embedded Image" src={this.state.imageSrc} />
      </div>
    )
  }
}

const styles = {
  body: {
    marginTop: 80,
    marginBottom: 80,
  },
  webcamContainer: {
    height: 250,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
}
