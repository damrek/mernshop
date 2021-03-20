import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

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

const OrderScreen = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader open={loading} />
  ) : error ? (
    <Message severity="error">{error}</Message>
  ) : (
    <div className={classes.root}>
      <Box>
        <Typography variant="h5" style={{ textAlign: 'center' }} color="primary">
          Order {order._id}
        </Typography>
      </Box>
      <Paper elevation={2}>
        <Grid container alignContent="center" justify="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Grid container justify="center">
              <List dense={true}>
                <ListItem>
                  <ListItemText
                    primary="Shipping address"
                    secondary={
                      <span>
                        {order.shippingAddress.address} - {order.shippingAddress.city},
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        {order.isDelivered ? (
                          <Message variant="success">Delivered on {order.deliveredAt}</Message>
                        ) : (
                          <Message variant="danger">Not delivered</Message>
                        )}
                      </span>
                    }
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Name"
                    secondary={
                      <span>
                        {order.user.name}{' '}
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                      </span>
                    }
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Payment Method"
                    secondary={
                      <span>
                        {order.paymentMethod}
                        {order.isPaid ? (
                          <Message severity="success">Paid on {order.paidAt}</Message>
                        ) : (
                          <Message severity="danger">Not paid</Message>
                        )}
                      </span>
                    }
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Order items"
                    secondary={
                      <span>
                        {order.orderItems.length === 0 ? (
                          <p>Order is empty</p>
                        ) : (
                          order.orderItems.map((item, index) => (
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
                          <strong>Items:</strong> {Number(order.itemsPrice).toFixed(2)}€
                        </p>
                        <p>
                          <strong>Shipping:</strong> {order.shippingPrice}€
                        </p>
                        <p>
                          <strong>Tax:</strong> {order.taxPrice}€
                        </p>
                        <p>
                          <strong>Total:</strong> {order.totalPrice}€
                        </p>
                      </span>
                    }
                    classes={{ primary: classes.primaryListItemText }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <span>
                        {!order.isPaid && loadingPay && <Loader open={loadingPay} />}
                        {!sdkReady ? (
                          <Loader open={sdkReady} />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
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

export default OrderScreen;
