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
    <div {...props} className={`alert alert-danger ${className}`} role="alert">
      {error}
    </div>
  ) : null;

export default ErrorMessage;
