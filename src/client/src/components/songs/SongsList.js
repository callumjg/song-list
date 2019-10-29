import React, { useState, useMemo } from "react";
import useResource from "../../hooks/useResource";
import SongSearch from "./SongSearch";
import PageButtons from "../util_components/PageButtons";
import SongsTable from "./SongsTable";
import SongsControls from "./SongsControls";
import useSongListReducer from "./useSongListReducer";
import Loader from "../util_components/Loader";

const SongsList = props => {
	const initialState = {
		limit: 50,
		page: 0,
		tags: ["category a"],
		exclude: ["archived", "deleted"],
		search: ""
	};
	const [state, dispatch] = useSongListReducer(initialState);
	const { limit, page, tags, exclude, search } = state;
	const [searchInput, setSearchInput] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [timer, setTimer] = useState(null);

	const url = useMemo(() => {
		let url = `/songs?limit=${limit}`;
		if (typeof limit === "number") url += `&skip=${limit * page}`;
		if (tags.length) url += `&tags=${tags.map(t => t.toLowerCase()).join(",")}`;
		if (exclude.length)
			url += `&exclude=${exclude.map(t => t.toLowerCase()).join(",")}`;
		if (search) url += `&search=${search}`;
		return url;
	}, [limit, page, tags, exclude, search]);

	const [{ count, songs }, error, isLoading] = useResource(url, {
		count: 0,
		songs: []
	});

	function setSearchDelayed(string) {
		setIsPending(true);
		setSearchInput(string);
		clearTimeout(timer);
		setTimer(
			setTimeout(() => {
				dispatch({ type: "SET_SEARCH", payload: string });
				setIsPending(false);
			}, 200)
		);
	}

	return (
		<section className="songs-list relative my-3">
			<SongsControls state={state} dispatch={dispatch} />
			<SongSearch search={searchInput} setSearch={setSearchDelayed} />
			{error && <p className="alert alert-danger my-2 p-2">{error}</p>}
			<div className="relative">
				<Loader loading={isLoading || isPending}>
					<SongsTable songs={songs} />
				</Loader>
			</div>
			<PageButtons
				page={page}
				pagesNum={Math.ceil(count / limit)}
				setPage={payload => dispatch({ type: "SET_PAGE", payload })}
			/>
		</section>
	);
};

export default SongsList;
