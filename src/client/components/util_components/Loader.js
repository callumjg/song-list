import React from "react";
import "./Loader.scss";
const Loader = props => {
	if (!props.loading) return props.children;
	return (
		<div>
			<div className="loader">
				<div />
			</div>
			{props.children}
		</div>
	);
};

export default Loader;
