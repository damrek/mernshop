import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UserInfoMenu from './UserInfoMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    background: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: 'small',
    },
  },
  button: {
    color: 'white',
    '&.active': {
      color: 'yellow',
    },
    '&:hover': {
      color: 'red',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'small',
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

          {userInfo ? (
            <UserInfoMenu userInfo={userInfo} />
          ) : (
            <Button
              className={classes.button}
              component={NavLink}
              to="/login"
              startIcon={<PersonIcon />}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
