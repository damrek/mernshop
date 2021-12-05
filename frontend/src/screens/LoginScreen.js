import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import PasswordInput from '../components/inputs/PasswordInput';
import Loader from '../components/Loader';
import Message from '../components/Message';
import UserContext from '../context/UserContext';

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

  const {
    userLogin: { loading, error, userInfo },
  } = useContext(UserContext);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const btnSubmitIsDisabled = email === '' || password === '';

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
      {loading && <Loader open={loading} />}
      <form className={classes.root} autoComplete="off">
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
          Sign In
        </Typography>
        <TextField
          required
          variant="outlined"
          id="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <PasswordInput
          id="password"
          label="Password"
          variant="outlined"
          handleOnChange={setPassword}
          value={password}
        />
        {error && <Message severity="error">{error}</Message>}
        <Button
          variant="contained"
          width="100px"
          color="primary"
          onClick={submitHandler}
          disabled={btnSubmitIsDisabled}
          type="submit"
        >
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
