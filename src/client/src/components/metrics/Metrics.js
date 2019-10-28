import React, { useState } from "react";
import useResources from "../../hooks/useResource";
import CategoryButtons from "./CategoryButtons";
import Loader from "../util_components/Loader";
import Sticky from "../util_components/Sticky";
import { differenceInCalendarWeeks, compareDesc, format } from "date-fns";
import "./Metrics.scss";
import RangeButtons from "./RangeButtons";

const today = new Date();
function getAges(songs) {
	return songs.map(song => {
		let { services } = song;
		let weeksSincePlayed;
		if (!services.length) {
			weeksSincePlayed = "∞";
		} else {
			services = services.map(s => new Date(s.date));
			if (services.length > 1)
				services = services.sort((a, b) => compareDesc(a, b));
			weeksSincePlayed = differenceInCalendarWeeks(today, services[0]);
		}
		song.metrics.weeksSincePlayed = weeksSincePlayed;
		return song;
	});
}

// Functional component
function Metrics(props) {
	const [range, setRange] = useState("6 months");
	const [category, setCategory] = useState(/Category A/i);
	const [sortBy, setSortBy] = useState("PLAYS");
	const [isAsc, setIsAsc] = useState(false);

	function sortSincePlayed(a, b) {
		let aWeeks = a.metrics.weeksSincePlayed;
		let bWeeks = b.metrics.weeksSincePlayed;
		aWeeks = typeof aWeeks === "string" ? 9999999 : aWeeks;
		bWeeks = typeof bWeeks === "string" ? 9999999 : bWeeks;
		return isAsc ? bWeeks - aWeeks : aWeeks - bWeeks;
	}
	function sortPlays(a, b) {
		return isAsc
			? a.metrics.plays[range] - b.metrics.plays[range]
			: b.metrics.plays[range] - a.metrics.plays[range];
	}

	function sortSongs(arr) {
		return sortBy === "PLAYS"
			? arr.sort(sortSincePlayed).sort(sortPlays)
			: arr.sort(sortPlays).sort(sortSincePlayed);
	}

	let [{ songs }, error, isLoading] = useResources("/songs/metrics", {
		songs: [],
		count: 0
	});
	songs = getAges(songs);
	const avPlays =
		songs.reduce((acc, song) => acc + song.metrics.plays[range], 0) /
		songs.length;
	return (
		<section className="metrics container py-3 relative">
			<Sticky>
				{stuck => (
					<div className={`metric-controls${stuck ? " stuck" : ""}`}>
						<div className={stuck ? "container" : ""}>
							<CategoryButtons category={category} setCategory={setCategory} />
							<RangeButtons range={range} setRange={setRange} />
						</div>
					</div>
				)}
			</Sticky>
			<Loader loading={isLoading}>
				{error && <div className="alert alert-danger">{error}</div>}
				<table className="table songs-table">
					<thead>
						<tr>
							<th>Title</th>
							<th
								className="text-center sortable"
								onClick={() =>
									sortBy === "PLAYS" ? setIsAsc(!isAsc) : setSortBy("PLAYS")
								}
							>
								Plays
								{sortBy === "PLAYS" && (
									<i
										className={`ui ${isAsc ? "up" : "down"} chevron icon ml-2`}
									/>
								)}
							</th>
							<th
								className="text-right sortable"
								onClick={() =>
									sortBy === "PLAYS" ? setSortBy("WKS") : setIsAsc(!isAsc)
								}
							>
								Wks since played
								{sortBy !== "PLAYS" && (
									<i
										className={`ui ${isAsc ? "down" : "up"} chevron icon ml-2`}
									/>
								)}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortSongs(
							songs.filter(s => s.tags.find(cat => cat.match(category)))
						).map((s, i) => (
							<tr
								key={i}
								className={
									s.metrics.plays[range] < avPlays ? "text-danger" : ""
								}
							>
								<td>{s.title}</td>
								<td className="text-center">{s.metrics.plays[range]}</td>
								<td className="text-right">{s.metrics.weeksSincePlayed}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Loader>
		</section>
	);
}

export default Metrics;
