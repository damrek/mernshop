import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { RatingBar } from './RatingBar';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  media: {
    height: '150px',
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia className={classes.media} image={product.image} title={product.name} />
        <CardContent>
          <Typography gutterBottom variant="subtitle2">
            {product.name}
          </Typography>
          <RatingBar value={product.rating} text={`${product.numReviews} reviews`} />
          <Typography variant="button" color="textPrimary" component="p">
            {product.price} €
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
