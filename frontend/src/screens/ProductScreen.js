import React, { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { RatingBar } from '../components/RatingBar';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NumberFormat from 'react-number-format';

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
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={12} lg={12}>
            <Button component={NavLink} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>
              Go back
            </Button>
          </Grid>

          {loading ? (
            <Loader open={_.isEmpty(product) ? true : false} />
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
                <Divider variant="fullWidth" />
                {product.countInStock > 0 && (
                  <ListItem>
                    <ListItemText
                      secondary={
                        <NumberFormat
                          label="Quantity"
                          value={qty > 0 ? qty : 1}
                          customInput={TextField}
                          type="number"
                          allowNegative={false}
                          onValueChange={(e) => handleQty(e.value)}
                        />
                      }
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                    }
                  />
                  <ListItemText
                    primary={
                      <span style={{ cursor: 'not-allowed' }}>
                        <Button
                          p={4}
                          variant="outlined"
                          disabled={addToCartBtnDisabled}
                          startIcon={<ShoppingBasketIcon />}
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </span>
                    }
                  />
                </ListItem>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    )
  );
};

export default ProductScreen;
