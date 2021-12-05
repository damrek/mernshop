import './index.css';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import { createMuiTheme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { UserProvider } from './context/UserContext';
import store from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
