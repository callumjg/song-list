import React, { useState } from "react";
import useResources from "../../hooks/useResource";
import CategoryButtons from "./CategoryButtons";
import Loader from "../util_components/Loader";
import "./Metrics.scss";
import RangeButtons from "./RangeButtons";

const Metrics = props => {
	const [range, setRange] = useState("total");
	const [category, setCategory] = useState(/Category A/i);
	const [{ songs }, error, isLoading] = useResources("/songs/metrics", {
		songs: [],
		count: 0
	});

	return (
		<section className="metrics container py-3 relative">
			<Loader loading={isLoading}>
				{error && <div className="alert alert-danger">{error}</div>}
				<div className="d-flex justify-content-between">
					<CategoryButtons category={category} setCategory={setCategory} />
					<RangeButtons range={range} setRange={setRange} />
				</div>
				<table className="table songs-table">
					<thead>
						<tr>
							<th>Title</th>
							<th className="text-right">Plays</th>
							<th className="text-right">Per Service</th>
							<th className="text-right">Per Month</th>
						</tr>
					</thead>
					<tbody>
						{songs
							.filter(s => s.tags.find(cat => cat.match(category)))
							.sort((a, b) => b.metrics.plays[range] - a.metrics.plays[range])
							.map((s, i) => (
								<tr key={i}>
									<td>{s.title}</td>
									<td className="text-right">{s.metrics.plays[range]}</td>
									<td className="text-right">
										{Math.round(s.metrics.playsPerService[range] * 1000) / 1000}
									</td>
									<td className="text-right">
										{Math.round(s.metrics.playsPerMonth[range] * 1000) / 1000}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</Loader>
		</section>
	);
};

export default Metrics;
