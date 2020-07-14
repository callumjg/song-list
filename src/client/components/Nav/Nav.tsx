import React, { useState } from 'react';
import Hamburger from './Hamburger';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import logo from './logo.jpg';
import './Nav.scss';

export interface Link {
  onClick: () => void;
  label: string;
}

interface Props {
  links?: Link[];
  activeTab?: string;
}

const Nav: React.FC<Props> = ({ links = [], activeTab }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navStatus = isNavOpen ? ' open' : '';

  useBodyScrollLock(isNavOpen);

  return (
    <nav className="navbar navbar-light bg-light">
      <img src={logo} className="navbar-brand" alt="GPC" />
      <Hamburger onClick={() => setIsNavOpen(true)} />
      <div
        className={`links-slider-backdrop${navStatus}`}
        onClick={() => setIsNavOpen(false)}
      >
        <div className={`links-slider${navStatus}`}>
          <ul className="navbar-nav">
            {links.map(({ onClick, label }, i) => (
              <li
                key={i}
                onClick={onClick}
                className={activeTab === label ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
