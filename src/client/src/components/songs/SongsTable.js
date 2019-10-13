import React from "react";
import SongRow from "./SongRow";
import "./SongsTable.scss";

const SongsTable = ({ songs }) => {
	return (
		<table className="table songs-table">
			<thead className="">
				<tr>
					<th>Title</th>
					<th>
						<i className="ui user icon" />
					</th>
					<th>
						<i className="ui key icon" />
					</th>
					<th>
						<i className="ui tags icon" />
					</th>
					<th>
						<i className="ui chain icon" />
					</th>
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
