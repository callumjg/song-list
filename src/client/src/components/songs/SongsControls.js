import React from "react";
import SongTags from "./SongTags";
import Sticky from "../util_components/Sticky";
import Limiter from "../util_components/Limiter";

const SongsControls = ({ state, dispatch }) => {
	const { tags, exclude, limit } = state;
	return (
		<Sticky>
			{stuck => (
				<section className={`controls${stuck}`}>
					<div className={stuck ? "container" : ""}>
						<div className="d-flex justify-content-between align-items-center">
							<SongTags
								tags={tags}
								setTags={payload => dispatch({ type: "SET_TAGS", payload })}
								exclude={exclude}
								setExclude={payload =>
									dispatch({ type: "SET_EXCLUDE", payload })
								}
							/>
							<Limiter
								limit={limit}
								setLimit={payload => dispatch({ type: "SET_LIMIT", payload })}
								setPage={payload => dispatch({ type: "SET_PAGE", payload })}
								limitButtons={[10, 30, 50, 100, "All"]}
							/>
						</div>
					</div>
				</section>
			)}
		</Sticky>
	);
};

export default SongsControls;
