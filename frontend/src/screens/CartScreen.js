import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5px',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },

  itemNameText: {
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'small',
    },
  },

  deleteItemIcon: {
    color: 'red',
  },
}));

const CartScreen = ({ match, location, history }) => {
  const classes = useStyles();
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Container>
      <Grid container direction="column">
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h5" style={{ marginTop: '25px' }} color="primary">
              <ShoppingCartIcon style={{ position: 'relative', top: '4px' }} /> Shopping Cart
            </Typography>
          </Box>
        </Grid>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link style={{ textDecoration: 'none' }} to="/">
              Go Back
            </Link>
          </Message>
        ) : (
          <div>
            <Grid container justify="flex-start" alignItems="center" className={classes.root}>
              <Grid item xs={4} md={2}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.itemNameText}
                >
                  Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                </Typography>
              </Grid>
              <Grid item xs={2} md={5}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.itemNameText}
                  style={{ fontWeight: 'bold' }}
                >
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}€
                </Typography>
              </Grid>
              <Grid item xs>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  size="small"
                >
                  Checkout
                </Button>
              </Grid>
            </Grid>
            <Grid container alignItems="center" className={classes.root}>
              <List>
                <Grid item xs={12} md={8}>
                  {cartItems.map((item) => (
                    <ListItem key={item.product} alignItems="flex-start" style={{ width: '100%' }}>
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.image} className={classes.large} />
                      </ListItemAvatar>
                      <ListItemText
                        style={{ width: '20%' }}
                        primary={
                          <Link
                            color="primary"
                            className={classes.itemNameText}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        }
                        secondary={`${item.price} €`}
                      ></ListItemText>
                      <ListItemText
                        style={{ width: '20%' }}
                        secondary={
                          <NumberFormat
                            label="Quantity"
                            value={item.qty}
                            customInput={TextField}
                            type="number"
                            allowNegative={false}
                            onChange={(e) => {
                              if (e.target.value > 0)
                                dispatch(addToCart(item.product, Number(e.target.value)));
                            }}
                          />
                        }
                      ></ListItemText>

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeFromCartHandler(item.product)}
                          className={classes.deleteItemIcon}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </Grid>
              </List>
            </Grid>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default CartScreen;
