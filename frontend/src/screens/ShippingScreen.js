import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { saveShippingAddress } from '../actions/cartActions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const ShippingScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.postalCode);

  const btnSubmitIsDisabled =
    !address ||
    address.length === 0 ||
    !city ||
    city.length === 0 ||
    !postalCode ||
    postalCode.length === 0 ||
    !country ||
    country.length === 0
      ? true
      : false;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push('/payment');
  };

  return (
    <FormContainer>
      <form className={classes.root} autoComplete="off">
        <Box>
          <Typography
            variant="h5"
            style={{ marginTop: '25px', textAlign: 'center' }}
            color="primary"
          >
            {' '}
            <LocalShippingIcon style={{ position: 'relative', top: '4px' }} /> Shipping process
          </Typography>
        </Box>
        <TextField
          required
          variant="outlined"
          id="address"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          required
          variant="outlined"
          id="city"
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          required
          variant="outlined"
          id="postalCode"
          label="Postalcode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          required
          variant="outlined"
          id="country"
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button
          variant="contained"
          width="100px"
          color="primary"
          onClick={submitHandler}
          disabled={btnSubmitIsDisabled}
        >
          Continue
        </Button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
