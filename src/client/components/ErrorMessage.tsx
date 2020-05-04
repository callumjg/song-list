import React from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
  error: string;
  isHidden?: boolean;
}

const ErrorMessage: React.FC<Props> = ({
  error,
  isHidden,
  className,
  ...props
}) =>
  error && !isHidden ? (
    <div
      {...props}
      className={`alert alert-danger ${className}`}
      role="alert"
      style={{ marginBottom: 0 }}
    >
      {error}
    </div>
  ) : null;

export default ErrorMessage;
