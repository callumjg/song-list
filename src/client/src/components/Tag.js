import React from "react";
import "./Tag.css";

const Tag = props => (
	<div className="tag" onClick={props.onClick}>
		{props.children}
		<i className={`ui ${props.icon || "delete"} icon`} />
	</div>
);

export default Tag;
