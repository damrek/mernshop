import {
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { listMyOrders } from '../actions/orderActions';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import PasswordInput from '../components/inputs/PasswordInput';
import Loader from '../components/Loader';
import Message from '../components/Message';
import UserContext from '../context/UserContext';
import isEmail from '../utils/validations/isEmail';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  notPaidIcon: {
    color: 'red',
  },
}));

const ProfileScreen = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const {
    userLogin: { userInfo },
  } = useContext(UserContext);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const passwordsMatch = password === confirmPassword;
  const isValidEmail = useMemo(() => isEmail(email), [email]);
  const btnSubmitIsDisabled =
    name === '' || email === '' || password !== confirmPassword || password.length < 6;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length < 4) {
      setMessage('Name invalid');
    } else if (!passwordsMatch) {
      setMessage('Password do not match');
    } else if (!isValidEmail) {
      setMessage('Email not valid');
    } else {
      setSubmitStatus(true);
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (success) {
      setSubmitStatus(false);
    }
  }, [loading, success]);

  return (
    <Grid container>
      <Grid item xs={12} md>
        <FormContainer>
          {loading && <Loader open={loading} />}
          <form className={classes.root} autoComplete="off">
            <Typography
              variant="h5"
              style={{ marginTop: '25px', textAlign: 'center' }}
              color="primary"
            >
              {user && user.name ? `Welcome ${user.name}` : null}
            </Typography>
            {submitStatus && <LinearProgress />}
            {success && <Message severity="success">Profile updated</Message>}
            <TextField
              required
              variant="outlined"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={
                name.length > 0 && name.length < 4 ? 'Name  invalid: 4 character atleast' : null
              }
            />
            <TextField
              required
              variant="outlined"
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={!isValidEmail && email.length > 1 ? 'Invalid email' : null}
            />
            <PasswordInput
              id="password"
              label="Password"
              variant="outlined"
              handleOnChange={setPassword}
              value={password}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm password"
              variant="outlined"
              handleOnChange={setConfirmPassword}
              value={confirmPassword}
            />

            {message && <Message severity="error">{message}</Message>}
            {error && <Message severity="error">{error}</Message>}
            <Button
              variant="contained"
              width="100px"
              color="primary"
              onClick={submitHandler}
              disabled={btnSubmitIsDisabled}
            >
              Update
            </Button>
          </form>
        </FormContainer>
      </Grid>
      <Grid item xs={12} md={7}>
        {loadingOrders ? (
          <Loader open={loadingOrders} />
        ) : errorOrders && errorOrders.length > 0 ? (
          <Message severity="error">{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Typography
            variant="subtitle1"
            style={{ marginTop: '25px', textAlign: 'center' }}
            color="primary"
          >
            Not available orders
          </Typography>
        ) : (
          <>
            <Typography
              variant="h5"
              style={{ marginTop: '25px', textAlign: 'center' }}
              color="primary"
            >
              <span>
                <LocalGroceryStoreIcon fontSize="small" /> My Orders
              </span>
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '15px' }}>
              <Table className={classes.table} size="small" aria-label="my orders table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">DATE</StyledTableCell>
                    <StyledTableCell align="right">TOTAL</StyledTableCell>
                    <StyledTableCell align="right">PAID AT</StyledTableCell>
                    <StyledTableCell align="right">DELIVERED AT</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <StyledTableRow key={index}>
                      <TableCell component="th" scope="row">
                        {order._id}
                      </TableCell>
                      <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell align="right">{`${order.totalPrice}€`}</TableCell>
                      <TableCell align="right">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <Tooltip title="Not paid yet" aria-label="not_paid">
                            <InfoIcon fontSize="small" className={classes.notPaidIcon} />
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <Tooltip title="Not delivered yet" aria-label="not_delivered">
                            <InfoIcon fontSize="small" className={classes.notPaidIcon} />
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          component={NavLink}
                          to={`/order/${order._id}`}
                          variant="outlined"
                          size="small"
                          color="primary"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
