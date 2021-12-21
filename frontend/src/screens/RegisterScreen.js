import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { FormikPasswordInputField as PasswordInput } from '../components/inputs/FormikPasswordInputField';
import { FormikTextField as TextField } from '../components/inputs/FormikTextField';
import Loader from '../components/Loader';
import isEmail from '../utils/validations/isEmail';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const RegisterScreen = ({ location, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <FormContainer>
      {loading && <Loader open={loading} />}
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = 'Required';
          } else if (values.name.length < 4) {
            errors.name = 'Min length is 4 characters';
          }

          if (!values.email) {
            errors.email = 'Required';
          } else if (!isEmail(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          }
          if (values.password !== values.confirmPassword) {
            errors.password = 'Password do not match';
          }
          if (values.password.length < 6) {
            errors.password = 'Min length is 6 characters';
          }

          return errors;
        }}
        onSubmit={async ({ name, email, password }, { setSubmitting }) => {
          setSubmitting(true);
          await dispatch(register(name, email, password));
        }}
      >
        {(formik) => {
          return (
            <Form className={classes.root} autoComplete="off">
              <Typography
                variant="h5"
                style={{ marginTop: '25px', textAlign: 'center' }}
                color="primary"
              >
                Sign Up
              </Typography>
              <TextField required variant="outlined" id="name" name="name" label="Name" />
              <TextField
                required
                variant="outlined"
                id="email"
                name="email"
                label="Email Address"
              />
              <PasswordInput id="password" name="password" label="Password" variant="outlined" />
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                variant="outlined"
              />

              <Button type="submit" variant="contained" width="100px" color="primary">
                Register
              </Button>
              <Grid item style={{ textAlign: 'center', paddingTop: '5px' }}>
                Have an Account?
                <span>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    Login
                  </Link>
                </span>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default RegisterScreen;
