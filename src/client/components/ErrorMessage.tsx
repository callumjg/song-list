import React from 'react';
import { AxiosError } from 'axios';

interface Props extends React.HTMLProps<HTMLDivElement> {
  error: AxiosError | string;
  isHidden?: boolean;
}

const ErrorMessage: React.FC<Props> = ({
  error,
  isHidden,
  className,
  ...props
}) => {
  let message = error;
  if (typeof error !== 'string') {
    message = error?.response?.data?.error || error?.message;
  }
  return error && !isHidden ? (
    <div
      {...props}
      className={`alert alert-danger ${className}`}
      role="alert"
      style={{ marginBottom: 0 }}
    >
      {message}
    </div>
  ) : null;
};

export default ErrorMessage;
