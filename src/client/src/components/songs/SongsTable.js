import React from "react";
import SongRow from "./SongRow";
import "./SongsTable.scss";

const SongsTable = ({ songs }) => {
	return (
		<table className="table songs-table">
			<thead className="">
				<tr>
					<th>Title</th>
					<th>Key</th>
					<th>Author</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{songs.map(s => (
					<SongRow key={s._id} song={s} />
				))}
			</tbody>
		</table>
	);
};
export default SongsTable;
