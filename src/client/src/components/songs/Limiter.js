import React from "react";
const Limiter = ({ setLimit, setPage, limit }) => {
	const pages = [10, 30, 50, 100, "All"];
	function onClick(v) {
		setLimit(v);
		setPage(0);
	}
	return (
		<div className="d-flex justify-content-end align-items-center">
			<span className="mr-2">Limit: </span>
			<div className="btn-group btn-group-toggle">
				{pages.map((p, i) => (
					<button
						className={`btn btn-sm no-glow btn-outline-secondary${
							limit === p ? " active" : ""
						}`}
						key={i}
						onClick={() => onClick(p)}
					>
						{p}
					</button>
				))}
			</div>
		</div>
	);
};

export default Limiter;
