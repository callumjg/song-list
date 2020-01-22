import React from "react";
import MetricsTableHead from "./MetricsTableHead";
import MetricsTableBody from "./MetricsTableBody";
import { StateDispatchProps } from "./useMetricsReducer";

const MetricsTable: React.FC<StateDispatchProps> = props => {
  return (
    <table className="table songs-table">
      <MetricsTableHead {...props} />
      <MetricsTableBody {...props} />
    </table>
  );
};

export default MetricsTable;
