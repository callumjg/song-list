import React from "react";
import Nav from "../Nav/Nav";
import Brand from "./Brand";
import "./Header.scss";

const Header: React.FC = () => (
  <div className="header">
    <div className="container">
      <Brand />
      <Nav />
    </div>
  </div>
);

export default Header;
