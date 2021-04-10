import {
  Button,
  Container,
  Grid,
  IconButton,
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { addSnackBarMsg } from '../actions/snackbarActions';
import EditProductDialog from '../components/dialogs/EditProductDialog';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SnackBarMsg from '../components/SnackBarMsg';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

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
  addProduct: {
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

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    } else if (successCreate || userInfo.isAdmin) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container maxWidth="md">
      <Grid item xs={12}>
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
          Products
        </Typography>
        <Button
          variant="text"
          className={classes.addProduct}
          startIcon={<AddCircleIcon />}
          onClick={createProductHandler}
        >
          Create product
        </Button>
        {loadingDelete && <Loader open={loadingDelete} />}
        {errorDelete && <Message severity="error">{errorDelete}</Message>}
        {loadingCreate && <Loader open={loadingCreate} />}
        {errorCreate && <Message severity="error">{errorCreate}</Message>}
        {loading && <Loader open={loading} />}
        {error && <Message severity="error">{error}</Message>}
        {products && products.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: '15px' }}>
            <Table className={classes.table} size="small" aria-label="my products table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">NAME</StyledTableCell>
                  <StyledTableCell align="center">PRICE</StyledTableCell>
                  <StyledTableCell align="center">CATEGORY</StyledTableCell>
                  <StyledTableCell align="center">BRAND</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <StyledTableRow key={product._id}>
                    <TableCell align="center" component="th" scope="row">
                      <CopyToClipboard
                        onCopy={() =>
                          dispatch(addSnackBarMsg(`Copied ${product._id} successfully!`))
                        }
                        text={product._id}
                      >
                        <Tooltip title="Copy id" aria-label="not_paid">
                          <span className={classes.idCopy}>{product._id}</span>
                        </Tooltip>
                      </CopyToClipboard>
                    </TableCell>

                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.price}€</TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center" padding="default">
                      <div style={{ display: 'flex' }}>
                        <EditProductDialog productId={product._id} />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(product._id)}
                          className={classes.noIcon}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {!loading && <SnackBarMsg />}
    </Container>
  );
};

export default ProductListScreen;
