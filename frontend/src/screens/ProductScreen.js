import React, { useState, useEffect } from 'react';
import { Button, Grid, List, ListItemText, makeStyles } from '@material-ui/core';
import { RatingBar } from '../components/RatingBar';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  media: {
    width: '100%',
  },
  addToCartBtnDisabled: {
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
}));

const ProductScreen = ({ match }) => {
  const classes = useStyles();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetch(`/api/products/${match.params.id}`).then((response) =>
        response.json()
      );

      setProduct(data);
    };

    fetchProduct();
  }, [match.params.id]);

  const addToCartBtnDisabled = product.countInStock === 0;

  return !_.isEmpty(product) ? (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Button component={NavLink} to="/" variant="outlined">
            Go back
          </Button>
        </Grid>

        <Grid item xs={12} md={5}>
          <img src={product.image} alt={product.name} className={classes.media}></img>
        </Grid>

        <Grid item xs={12} md={7}>
          <List>
            <ListItemText>
              <h2>{product.name}</h2>
            </ListItemText>
            <Grid container direction="row">
              <Grid item xs={12} md={4}>
                Price:
                <span>
                  <strong> {product.price} €</strong>{' '}
                </span>
              </Grid>
              <Grid item xs={12} md={4}>
                Status: <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button p={4} variant="outlined" disabled={addToCartBtnDisabled}>
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
            <ListItemText>
              <RatingBar value={product.rating} text={`${product.numReviews} reviews`} />
            </ListItemText>
            <ListItemText>{product.description}</ListItemText>
          </List>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductScreen;
