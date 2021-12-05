import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);

  return <UserContext.Provider value={{ userLogin }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.any,
};

export default UserContext;
