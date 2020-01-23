import React from "react";
import SongTags from "./SongTags";
import Sticky from "../../components/Sticky";
import Limiter from "../../components/Limiter";
import "./SongsControls.scss";

const SongsControls: React.FC<{ state: any; dispatch: any }> = ({
  state,
  dispatch
}) => {
  const { tags, exclude, limit } = state;
  return (
    <Sticky>
      {stuck => (
        <section className={`songs-controls${stuck ? " stuck" : ""}`}>
          <div className={stuck ? "container" : ""}>
            <SongTags
              tags={tags}
              setTags={payload => dispatch({ type: "SET_TAGS", payload })}
              exclude={exclude}
              setExclude={payload => dispatch({ type: "SET_EXCLUDE", payload })}
            />
            <Limiter
              limit={limit}
              setLimit={payload => dispatch({ type: "SET_LIMIT", payload })}
              setPage={payload => dispatch({ type: "SET_PAGE", payload })}
              limitButtons={[10, 30, 50, 100, "All"]}
            />
          </div>
        </section>
      )}
    </Sticky>
  );
};

export default SongsControls;