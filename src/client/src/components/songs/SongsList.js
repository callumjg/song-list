import React, { useState, useEffect } from "react";
import server from "../../apis/server";

const SongsList = props => {
	const [songs, setSongs] = useState([]);
	const [limit, setLimit] = useState(20);

	useEffect(() => {
		(async () => {
			const url = `/songs?limit=${limit}`;
			const response = await server.get(url);
			console.log(response.data);
		})();
	}, [songs]);
	return <section>{songs.length}</section>;
};

export default SongsList;
