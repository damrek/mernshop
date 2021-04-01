import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      padding: theme.spacing(2),
    },
  },
}));

const Message = ({ severity, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity={severity}>{children}</Alert>
    </div>
  );
};

Message.defaultProps = {
  severity: 'info',
};

export default Message;
