import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&.active': {
      color: 'yellow',
    },
    '&:hover': {
      color: 'red',
    },
    marginTop: theme.spacing(5),
  },

  menuItemRoot: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&.active': {
      color: 'yellow',
    },
    '&:hover': {
      color: 'red',
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
  },
}));

const UserInfoMenu = ({ userInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
        startIcon={<AccountCircleIcon />}
      >
        {userInfo.name}
      </Button>
      <Menu
        id="userInfo-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.menuPaper }}
        elevation={0}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/profile"
          classes={{ root: classes.menuItemRoot }}
        >
          Profile
        </MenuItem>
        {userInfo && userInfo.isAdmin && (
          <>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/admin/userlist"
              classes={{ root: classes.menuItemRoot }}
            >
              Users
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/admin/productlist"
              classes={{ root: classes.menuItemRoot }}
            >
              Products
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/admin/orderlist"
              classes={{ root: classes.menuItemRoot }}
            >
              Orders
            </MenuItem>
          </>
        )}
        <MenuItem onClick={logoutHandler} classes={{ root: classes.menuItemRoot }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfoMenu;
