import React, { useEffect } from "react";
import useResources from "../../hooks/useResource";
import Loader from "../util_components/Loader";
import MetricsControls from "./MetricsControls";
import MetricsTable from "./MetricsTable";
import { useMetricsReducer, getMetrics } from "./helpers";
import "./Metrics.scss";

// Functional component
function Metrics(props) {
  const initialState = {
    range: "6",
    category: /Category A/i,
    sortBy: "PLAYS",
    isAsc: false,
    songs: []
  };

  const [state, dispatch] = useMetricsReducer(initialState);

  const [{ songs }, error, isLoading] = useResources(
    `/songs/metrics?range=${state.range}`,
    {
      songs: []
    }
  );
  useEffect(() => {
    dispatch({
      type: "SET_SONGS",
      payload: getMetrics(songs, state.range, state.sortBy, state.isAsc)
    });
  }, [songs, state.range, state.sortBy, state.isAsc, dispatch]);

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
