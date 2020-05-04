import React from 'react';
import './Loader.scss';

interface Props {
  loading?: boolean;
  noBackground?: boolean;
  diameter?: string;
  noStretch?: boolean;
  light?: boolean;
  backgroundStyle?: React.CSSProperties;
  spinnerStyle?: React.CSSProperties;
}

const Loader: React.FC<Props> = ({
  loading = true,
  children,
  noBackground,
  diameter = '2rem',
  noStretch,
  light,
  backgroundStyle = {},
  spinnerStyle = {},
}) => {
  if (!loading) return (children as React.ReactElement<any>) || null;

  const style = {
    width: diameter,
    height: diameter,
    borderColor: light ? 'rgba(100, 100, 100, 0.2)' : 'rgba(0, 0, 0, 0.6)',
    borderTopColor: light ? 'rgba(250, 250, 250, 0.5)' : 'rgba(0, 0, 0, 0.2)',
  };
  return (
    <div>
      <div
        className="loader"
        style={{
          backgroundColor: noBackground
            ? 'rgba(0,0,0,0)'
            : 'rgba(255,255,255,0.7)',
          position: noStretch ? undefined : 'absolute',
          ...backgroundStyle,
        }}
      >
        <div style={{ ...style, ...spinnerStyle }} />
      </div>
      {children}
    </div>
  );
};

export default Loader;
