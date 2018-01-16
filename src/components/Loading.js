

import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = () => (
    <div style={styles.container}>
        <h3 style={styles.heading}>Loading</h3>
        <CircularProgress size={60} thickness={7} />
    </div>
)

const styles = {
    container : {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', 
    },
    heading: {
        marginBottom: 40
    }
}

export default Loading