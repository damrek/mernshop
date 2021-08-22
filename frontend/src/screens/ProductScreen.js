import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { RatingBar } from '../components/RatingBar';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  media: {
    width: '100%',
  },
}));

const ProductScreen = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product = null } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => dispatch({ type: 'PRODUCT_DETAILS_RESET' });
  }, [dispatch, match]);

  const addToCartBtnDisabled = product.countInStock === 0;

  const handleQty = (val) => {
    if (val > product.countInStock) {
      val = product.countInStock;
    }
    setQty(val);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    !_.isEmpty(product) && (
      <div className={classes.root}>
        <Meta title={product.name} />
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={12} lg={12}>
            <Button
              onClick={() => history.goBack()}
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
            >
              Go back
            </Button>
          </Grid>

          {loading ? (
            <Loader open={_.isEmpty(product.id) ? loading : false} />
          ) : error ? (
            <Message severity="error">{error}</Message>
          ) : (
            <>
              <Grid item xs={12} md={4}>
                <img src={product.image} alt={product.name} className={classes.media}></img>
              </Grid>

              <Grid item xs={12} md={5}>
                <List>
                  <ListItemText>
                    <h2>{product.name}</h2>
                  </ListItemText>

                  <ListItemText>
                    <RatingBar value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListItemText>
                  <ListItemText>{product.description}</ListItemText>
                </List>
              </Grid>

              <Grid item xs={12} md={3}>
                <ListItem>
                  <ListItemText primary="Price" secondary={<strong> {product.price} €</strong>} />
                </ListItem>
                <Divider variant="middle" />
                {product.countInStock > 0 && (
                  <ListItem>
                    <ListItemText
                      secondary={
                        <FormControl className={classes.formControl}>
                          <InputLabel id="quantity">Quantity</InputLabel>
                          <Select
                            labelId="quantity-select"
                            id="selectquantity"
                            value={qty > 0 ? qty : 1}
                            onChange={(e) => handleQty(e.target.value)}
                            variant="standard"
                          >
                            {[
                              ...Array(product.countInStock > 5 ? 5 : product.countInStock).keys(),
                            ].map((q) => (
                              <MenuItem key={q} value={q + 1}>
                                {q + 1} items
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                    />
                  </ListItem>
                )}
                <>
                  <ListItem>
                    <ListItemText
                      primary="Status"
                      secondary={
                        <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <span style={{ cursor: 'not-allowed' }}>
                          <Button
                            p={4}
                            variant="contained"
                            color="primary"
                            disabled={addToCartBtnDisabled}
                            startIcon={<ShoppingBasketIcon />}
                            onClick={addToCartHandler}
                            type="submit"
                          >
                            Add To Cart
                          </Button>
                        </span>
                      }
                    />
                  </ListItem>
                </>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    )
  );
};

export default ProductScreen;
