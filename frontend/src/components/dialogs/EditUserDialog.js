import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addSnackBarMsg } from '../../actions/snackbarActions';
import { getUserDetails, listUsers, updateUser } from '../../actions/userActions';
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../../constants/userConstants';
import Loader from '../Loader';
import Message from '../Message';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),

    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const FormDialog = ({ userId, handleClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const classes = useStyles();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(addSnackBarMsg(`User updated succesfully!`));
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      dispatch(listUsers());
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Dialog
      keepMounted={false}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <div></div>
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
          Edit user
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
        {loading && <Loader open={loading} />}
        {loadingUpdate && <Loader open={loadingUpdate} />}
        <form className={classes.root} autoComplete="off">
          <Typography align="center" variant="subtitle2">
            {user._id}
          </Typography>
          <TextField
            variant="outlined"
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={user.isAdmin}
          />
          <TextField
            variant="outlined"
            id="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={user.isAdmin}
          />

          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                name="Admin"
                color="primary"
                disabled={user.isAdmin}
              />
            }
            label="Is admin?"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={user.isAdmin}
          >
            Update user
          </Button>
        </form>
      </DialogContent>
      <DialogActions>{error && <Message severity="error">{error}</Message>}</DialogActions>
    </Dialog>
  );
};

const EditUserDialog = React.memo(({ userId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton edge="start" aria-label="edit" onClick={handleClickOpen} color="primary">
        <EditIcon />
      </IconButton>
      {open && <FormDialog userId={userId} handleClose={handleClose} />}
    </>
  );
});

export default EditUserDialog;
