import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { listOrders } from '../actions/orderActions';
import { addSnackBarMsg } from '../actions/snackbarActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  checkIcon: {
    color: 'green',
  },
  noIcon: {
    color: 'red',
  },
  idCopy: {
    cursor: 'pointer',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  return (
    <Container maxWidth="md">
      <Grid item xs={12}>
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
          Orders
        </Typography>
        {loading && <Loader open={loading} />}
        {error && <Message severity="error">{error}</Message>}
        {orders && orders.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: '15px' }}>
            <Table className={classes.table} size="small" aria-label="my orders table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">USER</StyledTableCell>
                  <StyledTableCell align="center">DATE</StyledTableCell>
                  <StyledTableCell align="center">TOTAL</StyledTableCell>
                  <StyledTableCell align="center">PAID</StyledTableCell>
                  <StyledTableCell align="center">DELIVERED</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order._id}>
                    <TableCell align="center" component="th" scope="row">
                      <CopyToClipboard
                        onCopy={() => dispatch(addSnackBarMsg(`Copied ${order._id} successfully!`))}
                        text={order._id}
                      >
                        <Tooltip title="Copy id" aria-label="not_paid">
                          <span className={classes.idCopy}>{order._id}</span>
                        </Tooltip>
                      </CopyToClipboard>
                    </TableCell>

                    <TableCell align="center">{order.user && order.user.name}</TableCell>
                    <TableCell align="center">{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell align="center">{`${order.totalPrice}€`}</TableCell>
                    <TableCell align="center">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <CloseIcon className={classes.noIcon} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <CloseIcon className={classes.noIcon} />
                      )}
                    </TableCell>
                    <TableCell align="center" padding="default">
                      <Button
                        component={NavLink}
                        to={`/order/${order._id}`}
                        variant="outlined"
                        size="small"
                        color="primary"
                      >
                        Details
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Container>
  );
};

export default OrderListScreen;
