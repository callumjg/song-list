import React from "react";

const RowControls = props => {
	return (
		<div
			className={`my-row-controls${props.isActive ? " active" : ""}`}
			onClick={props.closeControls}
		>
			{props.children}
		</div>
	);
};

export default RowControls;
