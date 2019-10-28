import React from "react";
function CategoryButtons(props) {
	const categoryButtons = [
		["Category A", () => props.setCategory(/Category A/i)],
		["Category B (Hymn)", () => props.setCategory(/Category B/gi)]
	];
	return (
		<div className="btn-group btn-group-toggle mb-3">
			{categoryButtons.map(([label, onClick], i) => (
				<button
					key={i}
					type="button"
					onClick={onClick}
					className={`btn btn-sm btn-outline-primary no-glow${
						label.match(props.category) ? " active" : ""
					}`}
				>
					{label}
				</button>
			))}
		</div>
	);
}

export default CategoryButtons;
