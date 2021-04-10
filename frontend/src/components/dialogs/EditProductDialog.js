import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import { listProductDetails, listProducts, updateProduct } from '../../actions/productActions';
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
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

const FormDialog = ({ productId, handleClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const classes = useStyles();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product = null } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch(listProducts());
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await Axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      debugger;
      setUploadError('Error uploading file');
    }
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
        {error && <Message severity="error">{error}</Message>}
        {loading && <Loader open={loading} />}
        {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
        {loadingUpdate && <Loader open={loadingUpdate} />}
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
          <TextField
            variant="outlined"
            id="image"
            label="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            multiline
          />
          <Input
            id="image-file"
            onChange={uploadFileHandler}
            type="file"
            placeholder="Ssas"
          ></Input>
          {uploadError && (
            <Typography variant="caption" color="error">
              {uploadError}
            </Typography>
          )}
          {uploading && <Loader open={uploading} />}
          <NumberFormat
            label="Price €"
            value={price}
            customInput={TextField}
            type="text"
            allowNegative={false}
            decimalScale={2}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <NumberFormat
            label="Count in stock"
            value={countInStock}
            customInput={TextField}
            type="text"
            allowNegative={false}
            decimalScale={0}
            onChange={(e) => {
              setCountInStock(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            id="brand"
            label="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            multiline
          />
          <TextField
            variant="outlined"
            id="category"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
