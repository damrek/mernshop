import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {error && <Message severity="error">{error}</Message>}
      {loading && <Loader />}
      <form className={classes.root} autoComplete="off">
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
          Sign In
        </Typography>
        <TextField
          required
          variant="outlined"
          id="email"
          label="Email Address"
          defaultValue="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          variant="outlined"
          type="password"
          id="password"
          label="Password"
          defaultValue="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" width="100px" color="primary" onClick={submitHandler}>
          Sign In
        </Button>
        <Grid item style={{ textAlign: 'center', paddingTop: '5px' }}>
          New Customer?
          <span>
            <Link
              style={{ textDecoration: 'none' }}
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              {' '}
              Register
            </Link>
          </span>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
