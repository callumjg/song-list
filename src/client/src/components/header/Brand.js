import React from "react";
import logo from "./logo.jpg";
import "./Brand.scss";

const Brand = props => {
	return (
		<div className="brand">
			<img src={logo} />
		</div>
	);
};
export default Brand;
