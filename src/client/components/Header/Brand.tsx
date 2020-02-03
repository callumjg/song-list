import React from "react";
import logo from "./logo.jpg";
import "./Brand.scss";

const Brand: React.FC = () => (
  <div className="brand">
    <img src={logo} alt="Graceville Presbyterian Church" />
  </div>
);

export default Brand;
