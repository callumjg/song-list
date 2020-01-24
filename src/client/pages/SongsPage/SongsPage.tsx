import React, { useState, useMemo } from "react";
import useResource from "../../hooks/useResource";
import SongSearch from "./SongSearch";
import PageButtons from "../../components/PageButtons";
import SongsTable from "./SongsTable";
import SongsControls from "./SongsControls";
import useSongListReducer from "./useSongListReducer";
import Loader from "../../components/Loader";

const SongsPage: React.FC = props => {
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

  function setSearchDelayed(payload) {
    setIsPending(true);
    setSearchInput(payload);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        dispatch({ type: "SET_SEARCH", payload });
        setIsPending(false);
      }, 200)
    );
  }

  return (
    <div className="container py-3">
      <section className="songs-list relative ">
        <div className="pb-3">
          <SongsControls state={state} dispatch={dispatch} />
        </div>
        <div className="pb-3">
          <SongSearch search={searchInput} setSearch={setSearchDelayed} />
        </div>
        {error && <p className="alert alert-danger  p-2">{error}</p>}
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
    </div>
  );
};

export default SongsPage;