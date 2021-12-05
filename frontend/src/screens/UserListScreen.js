import {
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
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import { addSnackBarMsg } from '../actions/snackbarActions';
import { deleteUser, listUsers } from '../actions/userActions';
import EditUserDialog from '../components/dialogs/EditUserDialog';
import Loader from '../components/Loader';
import Message from '../components/Message';
import UserContext from '../context/UserContext';

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

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const {
    userLogin: { userInfo },
  } = useContext(UserContext);

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container maxWidth="md">
      <Grid item xs={12}>
        <Typography variant="h5" style={{ marginTop: '25px', textAlign: 'center' }} color="primary">
          Users
        </Typography>
        {loading && <Loader open={loading} />}
        {error && <Message severity="error">{error}</Message>}
        {users && users.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: '15px' }}>
            <Table className={classes.table} size="small" aria-label="my users table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">NAME</StyledTableCell>
                  <StyledTableCell align="center">EMAIL</StyledTableCell>
                  <StyledTableCell align="center">ADMIN</StyledTableCell>
                  <StyledTableCell align="center">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user._id}>
                    <TableCell align="center" component="th" scope="row">
                      <CopyToClipboard
                        onCopy={() => dispatch(addSnackBarMsg(`Copied ${user._id} successfully!`))}
                        text={user._id}
                      >
                        <Tooltip title="Copy id" aria-label="not_paid">
                          <span className={classes.idCopy}>{user._id}</span>
                        </Tooltip>
                      </CopyToClipboard>
                    </TableCell>

                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.isAdmin ? (
                        <CheckIcon className={classes.checkIcon} />
                      ) : (
                        <CloseIcon className={classes.noIcon} />
                      )}
                    </TableCell>
                    <TableCell align="center" padding="default">
                      <div style={{ display: 'flex' }}>
                        <EditUserDialog userId={user._id} />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(user._id)}
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
    </Container>
  );
};

export default UserListScreen;
