import React from 'react';
import Nav from '../Nav/Nav';
import Brand from './Brand';
import { Link } from '../Nav';

import './Header.scss';

interface Props {
  navLinks: Link[];
}

const Header: React.FC<Props> = ({ navLinks = [] }) => (
  <div className="header">
    <div className="container">
      <Brand />
      <Nav links={navLinks} />
    </div>
  </div>
);

export default Header;
