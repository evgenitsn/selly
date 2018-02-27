import React from 'react'

import SnackbarUI from 'material-ui/Snackbar'

const Snackbar = ({ open, message, onActionClick, customStyle }) => {
  return (
    <SnackbarUI
      open={open}
      message={message}
      contentStyle={{ color: 'white' }}
      bodyStyle={{ color: 'white', ...customStyle}}
      autoHideDuration={4000}
      onActionClick={onActionClick}
      action="CLOSE"
    />
  )
}

export default Snackbar
