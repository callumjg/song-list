import React from "react";

function RangeButtons(props) {
	const rangeButtons = [
		["Total", "total"],
		["2 Years", "2 years"],
		["1 Year", "1 year"],
		["6 Months", "6 months"],
		["3 Months", "3 months"],
		["1 Month", "1 month"]
	];
	return (
		<div className="btn-group btn-group-toggle">
			{rangeButtons.map(([label, r], i) => (
				<button
					key={i}
					type="button"
					onClick={() => props.setRange(r)}
					className={`btn btn-sm btn-outline-secondary no-glow${
						props.range === r ? " active" : ""
					}`}
				>
					{label}
				</button>
			))}
		</div>
	);
}

export default RangeButtons;
