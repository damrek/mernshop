import { Snackbar } from '@material-ui/core';
import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';

const SnackBarMsg = React.memo(({ message, handleCleanMsg }) => {
  const [openSnack, setOpenSnack] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
    handleCleanMsg();
  };

  useEffect(() => {
    if (message !== null) {
      setOpenSnack(true);
    }
  }, [message]);

  return openSnack ? (
    <Snackbar
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={openSnack}
      message={`${message}`}
      key={uniqueId()}
    />
  ) : null;
});

export default SnackBarMsg;
