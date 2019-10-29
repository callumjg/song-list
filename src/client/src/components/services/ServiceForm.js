import React, { useState, useMemo } from "react";
import useListReducer from "../../hooks/useListReducer";
import useResource from "../../hooks/useResource";
import SongSelector from "./SongSelector";
import "./ServiceForm.scss";

function ServiceForm(props) {
	const [search, setSearch] = useState("");
	const [songs, dispatch, a] = useListReducer([], { target: "_id" });
	const [date, setDate] = useState("");
	const url = useMemo(() => {
		if (search.length < 3) return null;
		return `/songs?limit=5&search=${search}`;
	}, [search]);
	const [resource, error, isLoading] = useResource(url);
	const searchSongs = resource ? resource.songs : [];

	function onSubmit(e) {
		e.preventDefault();
		props.onSubmit({ songs, date });
	}

	return (
		<form onSubmit={onSubmit} className="service-form container">
			{error && <div className="alert alert-danger">{error}</div>}
			<section className="form-group">
				<label>Date</label>
				<input
					className="form-control"
					type="date"
					required
					value={date}
					onChange={e => setDate(e.target.value)}
				/>
			</section>

			<section>
				<label>Songs</label>
				{songs.length ? (
					<ol className="songs-list">
						{songs.map(({ title, _id }) => (
							<li key={_id}>
								{title}
								<button className="btn btn-sm btn-outline-danger">
									<i
										className="ui trash icon"
										onClick={() => dispatch({ type: a.REMOVE, payload: _id })}
									/>
								</button>
							</li>
						))}
					</ol>
				) : (
					<div className="alert alert-info">No songs added</div>
				)}
			</section>
			<section className="search form-group">
				<input
					type="text"
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="form-control"
					placeholder="Search songs..."
				/>
				<SongSelector
					songs={searchSongs}
					isLoading={isLoading}
					onSelect={s => dispatch({ type: a.ADD, payload: s })}
				/>
			</section>
			<section className="d-flex justify-content-end">
				<button className="btn btn-sm btn-outline-primary mr-2">Save</button>
				<button
					type="button"
					onClick={props.onDismiss}
					className="btn btn-sm btn-outline-info mr-2"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={() => dispatch({ type: a.CLEAR })}
					className="btn btn-sm btn-outline-secondary"
				>
					Clear
				</button>
			</section>
		</form>
	);
}

export default ServiceForm;
