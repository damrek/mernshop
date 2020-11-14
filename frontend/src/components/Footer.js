import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm" align="center">
        <Grid item xs={12}>
          Copyright &copy; Ecommerce
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
