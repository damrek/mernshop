import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  reviewsCaption: {
    marginLeft: '10px',
  },
}));

export const RatingBar = ({ value, text }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Rating name="read-only" value={value || ''} readOnly size="small" />
      <Typography
        className={classes.reviewsCaption}
        variant="caption"
        color="textSecondary"
        component="p"
      >
        {text}
      </Typography>
    </Grid>
  );
};
