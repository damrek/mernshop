import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  textField: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
  },
}));

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} autoComplete="off">
        <TextField
          variant="outlined"
          id="text"
          placeholder="Search Products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={classes.textField}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="small"
          onClick={submitHandler}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
