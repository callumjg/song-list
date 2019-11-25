import React, { useEffect, useMemo } from "react";
import moment from "moment";
import useResources from "../../hooks/useResource";
import Loader from "../util_components/Loader";
import MetricsControls from "./MetricsControls";
import MetricsTable from "./MetricsTable";
import { useMetricsReducer } from "./useMetricsReducer";
import "./Metrics.scss";

// Component
function Metrics(props) {
  // Define initial state
  const initialState = {
    range: 6, // value in months
    category: /Category A/i,
    sortBy: "PLAYS",
    sort: -1,
    songs: []
  };

  // Metrics reducer
  const [state, dispatch] = useMetricsReducer(initialState);
  const { range, category, sortBy, sort } = state;

  // Fetch songs from api
  const [{ songs }, error, isLoading] = useResources(`/songs/metrics`, {
    songs: []
  });

  // Run analysis
  const filteredSongs = useMemo(() => {
    const startOfRange = range
      ? moment()
          .subtract(range, "months")
          .valueOf()
      : 0;
    let sortFuncs = [
      (a, b) => (b.weeksSincePlayed - a.weeksSincePlayed) * sort,
      (a, b) => (a.plays - b.plays) * sort
    ];

    sortFuncs = sortBy === "PLAYS" ? sortFuncs : sortFuncs.reverse();

    return songs
      .filter(song => song.tags.find(cat => cat.match(category)))
      .map(song => {
        const services = song.services.sort();
        const earliestService = services.length
          ? moment(services[0]).format("DD/MM/YYYY")
          : "-";
        const weeksSincePlayed = services.length
          ? moment().diff(moment(services.reverse()[0]), "weeks")
          : Infinity;
        const plays = services.filter(unix => unix >= startOfRange).length;
        return {
          ...song,
          services,
          plays,
          earliestService,
          weeksSincePlayed
        };
      })
      .sort(sortFuncs[0])
      .sort(sortFuncs[1]);
  }, [songs, range, category, sortBy, sort]);

  // Update state with filtered songs
  useEffect(() => {
    dispatch({
      type: "SET_SONGS",
      payload: filteredSongs
      // payload: getMetrics(songs, state.range, state.sortBy, state.sort)
    });
  }, [filteredSongs, dispatch]);

  return (
    <section className="metrics container py-3 relative">
      <MetricsControls state={state} dispatch={dispatch} />
      <Loader loading={isLoading}>
        {error && <div className="alert alert-danger">{error}</div>}
        <MetricsTable state={state} dispatch={dispatch} />
      </Loader>
    </section>
  );
}

export default Metrics;
