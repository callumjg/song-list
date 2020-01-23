import React from "react";
import Nav from "../Nav/Nav";
import Brand from "./Brand";
import "./Header.scss";

const Header: React.FC = () => (
  <header>
    <div className="container">
      <Brand />
      <Nav />
    </div>
  </header>
);

export default Header;
