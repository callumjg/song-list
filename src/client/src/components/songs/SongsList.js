import React, { useState } from "react";
import useResource from "../../hooks/useResource";
import SongSearch from "./SongSearch";
import SongTags from "./SongTags";
import PageButtons from "./PageButtons";
import SongsTable from "./SongsTable";
import Limiter from "./Limiter";
import Loader from "../util_components/Loader";
import "./SongsList.scss";

const SongsList = props => {
	const [limit, setLimit] = useState(50);
	const [page, setPage] = useState(0);
	const [tags, setTags] = useState(["category a"]);
	const [exclude, setExclude] = useState(["archived", "deleted"]);
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [timer, setTimer] = useState(null);

	function buildUrl() {
		let url = `/songs?limit=${limit}`;
		if (typeof limit === "number") url += `&skip=${limit * page}`;
		if (tags.length) url += `&tags=${tags.map(t => t.toLowerCase()).join(",")}`;
		if (exclude.length)
			url += `&exclude=${exclude.map(t => t.toLowerCase()).join(",")}`;
		if (search) url += `&search=${search}`;
		return url;
	}

	const url = buildUrl();
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
				setSearch(string);
				setIsPending(false);
			}, 100)
		);
	}

	return (
		<section className="relative py-3">
			<h4>Songs</h4>
			{error && <p className="alert alert-danger my-2 p-2">{error}</p>}
			<SongSearch search={searchInput} setSearch={setSearchDelayed} />
			<div className="tags-n-limit">
				<SongTags
					tags={tags}
					setTags={setTags}
					exclude={exclude}
					setExclude={setExclude}
				/>
				<Limiter limit={limit} setLimit={setLimit} setPage={setPage} />
			</div>
			<div className="relative">
				<Loader loading={isLoading || isPending}>
					<SongsTable songs={songs} />
				</Loader>
			</div>
			<PageButtons
				page={page}
				pagesNum={Math.ceil(count / limit)}
				setPage={setPage}
			/>
		</section>
	);
};

export default SongsList;
