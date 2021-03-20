import { Grid } from '@material-ui/core';
import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <Grid container direction="column" alignContent="center">
      <Grid item xs={12} md={5}>
        {children}
      </Grid>
    </Grid>
  );
};

export default FormContainer;
