import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckoutSteps from '../components/CheckoutSteps';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  primaryListItemText: {
    fontWeight: 'bold',
  },
}));

const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(console.log('place order'));
    history.push('/payment');
  };

  return (
    <div className={classes.root}>
      <CheckoutSteps step={2} />

      <Box>
        <Typography variant="subtitle2" style={{ textAlign: 'center' }} color="primary">
          {' '}
          <DescriptionIcon fontSize="small" style={{ position: 'relative', top: '4px' }} /> Shipping
        </Typography>
      </Box>
      <Paper elevation={2}>
        <Grid container alignContent="center" justify="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Grid container justify="center">
              <List dense={true}>
                <ListItem>
                  <ListItemText
                    primary="Address"
                    secondary={`${cart.shippingAddress.address} - ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Payment Method"
                    secondary={cart.paymentMethod}
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Order items"
                    secondary={
                      <span>
                        {cart.cartItems.length === 0 ? (
                          <p>Your cart is empty</p>
                        ) : (
                          cart.cartItems.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={`(${index + 1}) ${item.name}`}
                                secondary={
                                  <span>
                                    <p>
                                      {item.qty} x {item.price}€ ={' '}
                                      {Number(item.qty * item.price).toFixed(2)}€
                                    </p>
                                  </span>
                                }
                              />
                              <Divider light />
                            </ListItem>
                          ))
                        )}
                      </span>
                    }
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container justify="center">
              <List dense={true}>
                <ListItem>
                  <ListItemText
                    primary="Order summary"
                    secondary={
                      <span>
                        <p>
                          <strong>Items:</strong> {Number(cart.itemsPrice).toFixed(2)}€
                        </p>
                        <p>
                          <strong>Shipping:</strong> {cart.shippingPrice}€
                        </p>
                        <p>
                          <strong>Tax:</strong> {cart.taxPrice}€
                        </p>
                        <p>
                          <strong>Total:</strong> {cart.totalPrice}€
                        </p>
                        <Button
                          variant="contained"
                          width="100px"
                          color="primary"
                          disabled={cart.cartItems === 0}
                          onClick={placeOrderHandler}
                        >
                          Place order
                        </Button>
                      </span>
                    }
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PlaceOrderScreen;
