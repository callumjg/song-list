import React from "react";
import MetricsTableHead from "./MetricsTableHead";
import MetricsTableBody from "./MetricsTableBody";

function MetricsTable(props) {
  return (
    <table className="table songs-table">
      <MetricsTableHead {...props} />
      <MetricsTableBody {...props} />
    </table>
  );
}

export default MetricsTable;
