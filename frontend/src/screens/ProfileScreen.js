import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { Button, LinearProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import isEmail from '../utils/validations/isEmail';
import PasswordInput from '../components/inputs/PasswordInput';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const passwordsMatch = password === confirmPassword;
  const isValidEmail = useMemo(() => isEmail(email), [email]);
  const btnSubmitIsDisabled = name === '' || email === '' || password !== confirmPassword;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
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
    <FormContainer>
      {loading && <Loader open={loading} />}
      <form className={classes.root} autoComplete="off">
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
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
  );
};

export default ProfileScreen;
