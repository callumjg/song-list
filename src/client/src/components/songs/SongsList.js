import React, { useState, useEffect } from "react";
import server from "../../apis/server";
import SongSearch from "./SongSearch";
import SongTags from "./SongTags";
import PageButtons from "./PageButtons";
import SongsTable from "./SongsTable";
import Limiter from "./Limiter";
import Loader from "../util_components/Loader";

const SongsList = props => {
	const [songs, setSongs] = useState([]);
	const [limit, setLimit] = useState(30);
	const [page, setPage] = useState(0);
	const [pagesNum, setPagesNum] = useState(0);
	const [tags, setTags] = useState([]);
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [timer, setTimer] = useState(null);

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				let url = `/songs?limit=${limit}`;
				if (typeof limit === "number") url += `&skip=${limit * page}`;
				if (tags.length)
					url += `&tags=${tags.map(t => t.replace(" ", "_")).join("+")}`;
				if (search) url += `&search=${search}`;

				// make request
				const response = await server.get(url);

				// handle results
				const { songs, count } = response.data;
				setSongs(songs);
				setPagesNum(Math.ceil(count / limit));
			} catch (e) {
				let message = e.response ? e.response.data.message : e.message;
				setError(message);
			}
			setLoading(false);
		})();
	}, [limit, page, tags, search]);

	function setSearchDelayed(string) {
		setLoading(true);
		setSearchInput(string);
		clearTimeout(timer);
		setTimer(setTimeout(() => setSearch(string), 200));
	}

	return (
		<section className="relative py-3">
			<h4>Songs</h4>

			{error && <p className="alert alert-danger my-2 p-2">{error}</p>}
			<SongSearch search={searchInput} setSearch={setSearchDelayed} />
			<div className="d-flex justify-content-between">
				<SongTags tags={tags} setTags={setTags} />
				<Limiter limit={limit} setLimit={setLimit} setPage={setPage} />
			</div>
			<div className="relative">
				<Loader loading={loading}>
					<SongsTable songs={songs} />
				</Loader>
			</div>
			<PageButtons page={page} pagesNum={pagesNum} setPage={setPage} />
		</section>
	);
};

export default SongsList;
