import React, { useState } from 'react';
import './Tabs.scss';

interface Props {
  tabs: string[];
  onClick: (tab: string) => void;
  className?: string;
}

const Tabs: React.FC<Props> = ({ tabs, onClick, className }) => {
  const [active, setActive] = useState(tabs[0]);
  let classes = 'tab-container';
  if (className) classes += ` ${className}`;
  return (
    <div className={classes}>
      {tabs.map((tab) => (
        <div
          className={`tab${tab === active ? ' active' : ''}`}
          key={tab}
          onClick={() => setActive(tab)}
        >
          {tab}
        </div>
      ))}
      <div className="last" />
    </div>
  );
};

export default Tabs;
