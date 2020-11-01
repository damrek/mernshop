import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { Link, NavLink } from 'react-router-dom';

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

          <Link color="inherit" to="/cart">
            <Button className={classes.button} startIcon={<ShoppingCartIcon />}>
              Cart
            </Button>
          </Link>

          <Link color="inherit" to="/login">
            <Button className={classes.button} startIcon={<PersonIcon />}>
              Sign In
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
