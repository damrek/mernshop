import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Grid container direction="row">
      <Typography variant="h5" style={{ marginTop: '25px' }} color="primary">
        Latest Products
      </Typography>
      {loading ? (
        <Loader open={_.isEmpty(products) ? true : false} />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} lg={3} key={product._id}>
              <Product product={product} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default HomeScreen;
