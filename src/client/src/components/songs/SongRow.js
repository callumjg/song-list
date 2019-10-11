import React from "react";
import "./SongRow.scss";

const SongRow = ({ song }) => {
	return (
		<tr className="song-row">
			<td>{song.title}</td>
			<td>{song.key}</td>
			<td>{song.author}</td>
			<td>
				<a href={song.url} target="_blank" rel="noopener noreferrer">
					<i className="ui youtube icon" />
				</a>
			</td>
		</tr>
	);
};

export default SongRow;
