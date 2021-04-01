import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm" align="center">
        <Grid item xs={12}>
          <Typography variant="caption">Copyright &copy; Ecommerce</Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
