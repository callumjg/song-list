import React from 'react';
import Nav from '../Nav/Nav';
import Brand from './Brand';
import { Link } from '../Nav';

import './Header.scss';

interface Props {
  navLinks: Link[];
}

const Header: React.FC<Props> = ({ navLinks = [] }) => (
  <div className="header container-fluid">
    <Brand />
    <Nav links={navLinks} />
  </div>
);

export default Header;
