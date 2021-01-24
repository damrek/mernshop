import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: '#673ab7',
    color: 'white',
    '&.active': {
      color: 'yellow',
    },
    '&:hover': {
      color: 'red',
    },
  },

  menuItemRoot: {
    backgroundColor: '#673ab7',
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
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/profile"
          classes={{ root: classes.menuItemRoot }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={logoutHandler} classes={{ root: classes.menuItemRoot }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfoMenu;
