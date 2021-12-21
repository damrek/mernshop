import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';

/**
 * Custom input component which shows a TextField with an eye icon
 * in order to show/hide asterisks value
 *
 * @param {*} params
 * @param  {...any} props
 */
const PasswordInput = ({
  id,
  name = 'password',
  label,
  variant,
  defaultValue,
  value,
  onChange, // Formik onChange handler
  handleOnChange, // Custom onChange handler - remove in the future
  onBlur,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      id={id}
      label={label}
      variant={variant}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange ? onChange : (e) => handleOnChange(e.target.value)}
      onBlur={onBlur}
      name={name}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={error}
      helperText={helperText}
    />
  );
};

export default PasswordInput;
