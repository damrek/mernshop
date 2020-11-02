import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    background: '#673ab7',
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: 'white',
    '&.active': {
      color: 'yellow',
    },
    '&:hover': {
      color: 'red',
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} exact to="/">
              Ecommerce Application
            </NavLink>
          </Typography>

          <Button
            className={classes.button}
            component={NavLink}
            to="/cart"
            startIcon={<ShoppingCartIcon />}
          >
            Cart
          </Button>

          <Button
            className={classes.button}
            component={NavLink}
            to="/login"
            startIcon={<PersonIcon />}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
