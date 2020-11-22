import {
  Avatar,
  Button,
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import DeleteIcon from '@material-ui/icons/Delete';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5px',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
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
    <>
      <Grid container direction="column">
        <Grid item xs={12} md={7}>
          <Typography variant="h5" style={{ marginTop: '25px' }} color="primary">
            Shopping Cart
          </Typography>
        </Grid>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link style={{ textDecoration: 'none' }} to="/">
              Go Back
            </Link>
          </Message>
        ) : (
          <>
            <Grid container alignItems="center" className={classes.root}>
              <Grid item xs={12} md={4}>
                <Typography variant="h7" color="textSecondary">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h7" color="textSecondary">
                  Total:{' '}
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}€
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="center" className={classes.root}>
              <Grid item xs={12} md={7}>
                <List>
                  {cartItems.map((item) => (
                    <ListItem key={item.product} alignItems="center">
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.image} className={classes.large} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Link
                            color="primary"
                            style={{ textDecoration: 'none' }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        }
                        secondary={`${item.price} €`}
                        style={{ minWidth: '350px' }}
                      ></ListItemText>
                      <ListItemText
                        secondary={
                          <NumberFormat
                            label="Quantity"
                            value={item.qty}
                            customInput={TextField}
                            type="number"
                            allowNegative={false}
                            onChange={(e) =>
                              dispatch(addToCart(item.product, Number(e.target.value)))
                            }
                          />
                        }
                      ></ListItemText>

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CartScreen;
