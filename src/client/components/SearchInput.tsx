import React, { useState, useRef } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  callback: (v: string) => any;
  setLoading?: (v: boolean) => void;
  delay?: number;
  className?: string;
}

const SearcInput: React.FC<Props> = ({
  callback,
  setLoading,
  delay,
  ...props
}) => {
  const [search, setSearch] = useState('');
  const timer = useRef(null);

  const handleChange = (e) => {
    if (setLoading) setLoading(true);
    const { value } = e.target;
    setSearch(value);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (setLoading) setLoading(false);
      callback(value);
    }, delay);
  };
  return (
    <input
      type="text"
      onChange={handleChange}
      value={search}
      {...props}
    ></input>
  );
};

export default SearcInput;
