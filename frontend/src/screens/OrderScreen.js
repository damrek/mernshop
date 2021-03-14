import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  //   Button,
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
import { getOrderDetails } from '../actions/orderActions';
import Message from '../components/Message';

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

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

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
                          <Message variant="success">Paid on {order.paidAt}</Message>
                        ) : (
                          <Message variant="danger">Not paid</Message>
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
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default OrderScreen;
