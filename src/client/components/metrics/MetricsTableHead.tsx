import React from "react";
import { StateDispatchProps, State } from "./useMetricsReducer";

const MetricsTableHead: React.FC<StateDispatchProps> = ({
  state,
  dispatch
}) => {
  const { sortBy, sort } = state;

  return (
    <thead>
      <tr>
        <th>Title</th>
        <th className="text-center">Earliest Recorded Service</th>
        <th className="text-center">Average placement</th>
        <th
          className="text-center sortable"
          onClick={() =>
            dispatch(
              sortBy === "PLAYS"
                ? { type: "TOGGLE_SORT" }
                : { type: "SET_SORT_BY", payload: "PLAYS" }
            )
          }
        >
          Plays
          {sortBy === "PLAYS" && (
            <i className={`ui ${sort > 0 ? "up" : "down"} chevron icon ml-2`} />
          )}
        </th>
        <th
          className="text-right sortable"
          onClick={() =>
            dispatch(
              sortBy === "PLAYS"
                ? { type: "SET_SORT_BY", payload: "WEEKS" }
                : { type: "TOGGLE_SORT" }
            )
          }
        >
          Wks since played
          {sortBy !== "PLAYS" && (
            <i className={`ui ${sort > 0 ? "down" : "up"} chevron icon ml-2`} />
          )}
        </th>
      </tr>
    </thead>
  );
};

export default MetricsTableHead;
