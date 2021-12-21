import { useField } from 'formik';
import React from 'react';

import PasswordInput from './PasswordInput';

export const FormikPasswordInputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <PasswordInput
      variant="outlined"
      id={field.id}
      name={field.name}
      label={label}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      helperText={meta.touched && meta.error ? meta.error : null}
      error={!!meta.error && meta.touched}
      {...props}
    />
  );
};
