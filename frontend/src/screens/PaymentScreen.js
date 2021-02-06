import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const PaymentScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod ? cart.paymentMethod : 'PayPal'
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step={1} />
      <FormContainer>
        <form className={classes.root} autoComplete="off">
          <Box>
            <Typography variant="subtitle2" style={{ textAlign: 'center' }} color="primary">
              {' '}
              <PaymentIcon fontSize="small" style={{ position: 'relative', top: '4px' }} /> Payment
              details
            </Typography>
          </Box>
          <FormControl className={classes.formControl}>
            <InputLabel id="payment-method-label">Select a payment method</InputLabel>
            <Select
              labelId="payment-method-select"
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={'PayPal'}>PayPal</MenuItem>
              <MenuItem value={'Credit-card'}>Credit-card</MenuItem>
              <MenuItem value={'Stripe'}>Stripe</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" width="100px" color="primary" onClick={submitHandler}>
            Continue
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
