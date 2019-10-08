import React from "react";
import Row from "./Row";
const RowPair = props => {
	return (
		<Row {...props}>
			<div className="row-pair">
				<span className={props.flexLeft ? "flex-one" : ""}>{props.label}</span>
				<span className={props.flexRight ? "flex-one" : ""}>{props.for}</span>
			</div>
		</Row>
	);
};

export default RowPair;
