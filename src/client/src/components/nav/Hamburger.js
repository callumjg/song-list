import React from "react";
import "./Hamburger.scss";

const Hamburger = props => {
	return (
		<div className="hamburger" onClick={() => props.onClick()}>
			<div />
			<div />
			<div />
		</div>
	);
};

export default Hamburger;
