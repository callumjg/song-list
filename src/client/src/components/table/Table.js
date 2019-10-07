import React from "react";
import "./Table.css";

const Table = props => {
	return <div className="my-table">{props.children}</div>;
};

export default Table;
