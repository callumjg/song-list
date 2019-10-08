import React from "react";

const IconButtonRow = props => {
	return (
		<div className="icon-button-row" onClick={props.onClick}>
			<span>{props.label}</span>
			<i className={`${props.icon} icon`} />
		</div>
	);
};

export default IconButtonRow;
