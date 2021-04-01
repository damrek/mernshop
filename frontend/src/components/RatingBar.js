import { Grid, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';

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
      <Rating name="read-only" value={value || 0} readOnly size="small" />
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
