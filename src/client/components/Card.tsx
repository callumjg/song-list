import React from 'react';
import './Card.scss';

interface Props {
  className?: string
}

const Card : React.FC<Props> = ({ children, className, ...props }) => {
  let classes = 'ccc-card';
  if (className) classes += ` ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
