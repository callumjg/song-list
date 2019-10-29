import React from "react";

function MetricsTableHead({ state, dispatch }) {
	const { sortBy, isAsc } = state;

	return (
		<thead>
			<tr>
				<th>Title</th>
				<th className="text-center">Earliest Recorded Service</th>
				<th
					className="text-center sortable"
					onClick={() =>
						dispatch(
							sortBy === "PLAYS"
								? { type: "TOGGLE_IS_ASC" }
								: { type: "SET_SORT_BY", payload: "PLAYS" }
						)
					}
				>
					Plays
					{sortBy === "PLAYS" && (
						<i className={`ui ${isAsc ? "up" : "down"} chevron icon ml-2`} />
					)}
				</th>
				<th
					className="text-right sortable"
					onClick={() =>
						dispatch(
							sortBy === "PLAYS"
								? { type: "SET_SORT_BY", payload: "WEEKS" }
								: { type: "TOGGLE_IS_ASC" }
						)
					}
				>
					Wks since played
					{sortBy !== "PLAYS" && (
						<i className={`ui ${isAsc ? "down" : "up"} chevron icon ml-2`} />
					)}
				</th>
			</tr>
		</thead>
	);
}

export default MetricsTableHead;
