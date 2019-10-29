import React from "react";
import { getWeeksSincePlayed, sortSincePlayed, sortPlays } from "./helpers";
import { format } from "date-fns";
function MetricsTableBody({ state, dispatch }) {
	let { sortBy, isAsc, songs, range, category } = state;
	songs = getWeeksSincePlayed(songs);

	function sortSongs(arr) {
		return sortBy === "PLAYS"
			? arr.sort(sortSincePlayed(isAsc)).sort(sortPlays(range, isAsc))
			: arr.sort(sortPlays(range, isAsc)).sort(sortSincePlayed(isAsc));
	}
	const avPlays =
		songs.reduce((acc, song) => acc + song.metrics.plays[range], 0) /
		songs.length;

	return (
		<tbody>
			{sortSongs(
				songs.filter(s => s.tags.find(cat => cat.match(category)))
			).map((s, i) => (
				<tr
					key={i}
					className={s.metrics.plays[range] < avPlays ? "text-danger" : ""}
				>
					<td>{s.title}</td>
					<td className="text-center">
						{s.services.length
							? format(new Date(s.services[0].date), "dd/MM/yyy")
							: "-"}
					</td>
					<td className="text-center">{s.metrics.plays[range]}</td>
					<td className="text-right">{s.metrics.weeksSincePlayed}</td>
				</tr>
			))}
		</tbody>
	);
}

export default MetricsTableBody;
