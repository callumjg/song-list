import React, { useState } from 'react';
import './Tabs.scss';

interface Props {
  tabs: string[];
  onClick: (tab: string) => void;
  className?: string;
  leftWidth?: string;
}

const Tabs: React.FC<Props> = ({
  tabs,
  onClick,
  className,
  children,
  leftWidth,
}) => {
  const [active, setActive] = useState(tabs[0]);
  let classes = 'tab-container';
  if (className) classes += ` ${className}`;
  const onSelect = (e) => {
    const selected = e.target.innerHTML;
    setActive(selected);
    onClick(selected);
  };
  return (
    <div className={classes}>
      <div style={{ width: leftWidth || 0 }} />
      {tabs.map((tab) => (
        <button
          className={`tab${tab === active ? ' active' : ''}`}
          key={tab}
          onClick={onSelect}
        >
          {tab}
        </button>
      ))}
      <div>{children}</div>
    </div>
  );
};

export default Tabs;
