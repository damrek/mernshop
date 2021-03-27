import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
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
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

const UserListScreen = () => {
  const dispatch = useDispatch();
  const [userCopied, setUserCopied] = useState(null);
  const [openSnack, setOpenSnack] = useState(null);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const classes = useStyles();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const showSnackBar = (user) => {
    setUserCopied(user);
    setOpenSnack(true);
  };

  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
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
            <Table className={classes.table} size="small" aria-label="my orders table">
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
                    <TableCell align="center" component="th" scope="row" className={classes.idCopy}>
                      <CopyToClipboard onCopy={() => showSnackBar(user)} text={user._id}>
                        <Tooltip title="Copy id" aria-label="not_paid">
                          <span>{user._id}</span>
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
                    <TableCell align="center">
                      <Button
                        component={NavLink}
                        to={`/user/${user._id}/edit`}
                        variant="outlined"
                        size="small"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {openSnack && (
        <Snackbar
          onClose={handleSnackBar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={openSnack}
          message={`${userCopied._id} copied successfully!`}
          key={userCopied._id}
        />
      )}
    </Container>
  );
};

export default UserListScreen;
