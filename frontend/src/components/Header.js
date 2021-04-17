import { Badge } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import SearchBox from './SearchBox';
import UserInfoMenu from './UserInfoMenu';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    background: theme.palette.primary.main,
    padding: theme.spacing(1),
    flexWrap: 'wrap',
  },
  title: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
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

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <NavLink
              style={{ textDecoration: 'none', color: 'white', paddingRight: '15px' }}
              exact
              to="/"
            >
              Ecommerce Application
            </NavLink>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Typography>
          <div style={{ display: 'flex' }}>
            <Button
              className={classes.button}
              component={NavLink}
              to="/cart"
              startIcon={
                <Badge
                  color="error"
                  variant="standard"
                  badgeContent={!isEmpty(cartItems) ? cartItems.length : 0}
                >
                  <ShoppingCartIcon />
                </Badge>
              }
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
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
