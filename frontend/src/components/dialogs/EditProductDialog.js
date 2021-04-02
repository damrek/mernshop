import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProductDetails } from '../../actions/productActions';
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

const FormDialog = ({ productId, handleClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const classes = useStyles();

  const productDetails = useSelector((state) => state.productDetails);
  // eslint-disable-next-line no-unused-vars
  const { loading, error, product = null } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
    }
  }, [dispatch, productId, product]);

  const submitHandler = (e) => {
    e.preventDefault();
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
          Edit product
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <Typography align="center" variant="subtitle2">
            {product._id}
          </Typography>
          <TextField
            variant="outlined"
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            id="email"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Update product
          </Button>
        </form>
      </DialogContent>
      <DialogActions>{error && <Message severity="error">{error}</Message>}</DialogActions>
    </Dialog>
  );
};

const EditProductDialog = React.memo(({ productId }) => {
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
      {open && <FormDialog productId={productId} handleClose={handleClose} />}
    </>
  );
});

export default EditProductDialog;
