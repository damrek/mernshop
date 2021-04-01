import { Snackbar } from '@material-ui/core';
import { isEmpty, uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackBarMsg } from '../actions/snackbarActions';

const SnackBarMsg = () => {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);

  const snackbar = useSelector((state) => state.snackBar);
  const { message } = snackbar;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetSnackBarMsg());
  };

  useEffect(() => {
    if (!isEmpty(message)) {
      setOpenSnack(true);
    } else {
      setOpenSnack(false);
    }
  }, [message, openSnack]);

  return !isEmpty(message) && openSnack ? (
    <Snackbar
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={openSnack}
      message={`${message}`}
      key={uniqueId()}
    />
  ) : null;
};

export default SnackBarMsg;
