import React, { useState, useEffect } from "react";
import useResources from "../../hooks/useResource";
import server from "../../apis/server";
import "./Metrics.scss";

function reducer(state, action) {
	switch (action.type) {
		default:
			return state;
	}
}

const Metrics = props => {
	const [range, setRange] = useState("1 month");
	const [{ songs, count }, error, isLoading] = useResources("/songs/metrics", {
		songs: [],
		count: 0
	});

	return (
		<section className="metrics container py-3">
			<h4>Most picked</h4>
			<h5>Category A</h5>
			<table className="table songs-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Plays</th>
						<th>Per Service</th>
						<th>Per Month</th>
					</tr>
				</thead>
				<tbody>
					{songs
						.filter(s => s.tags.includes("Category A"))
						.sort((a, b) => b.services.length - a.services.length)
						.map((s, i) => (
							<tr key={i}>
								<td>{s.title}</td>
								<td>{s.metrics.plays[range]}</td>
								<td>
									{Math.round(s.metrics.playsPerService[range] * 1000) / 1000}
								</td>
								<td>
									{Math.round(s.metrics.playsPerMonth[range] * 1000) / 1000}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
};

export default Metrics;
