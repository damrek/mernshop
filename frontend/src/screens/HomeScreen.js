import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import { Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Grid container direction="row">
      <Typography variant="h5" style={{ marginTop: '25px' }} color="primary">
        Latest Products
      </Typography>
      {loading ? (
        <Backdrop className={classes.backdrop} open={_.isEmpty(products) ? true : false}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : error ? (
        <Grid container spacing={3} justify="center">
          <h3>{error}</h3>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} lg={3} key={product._id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default HomeScreen;
