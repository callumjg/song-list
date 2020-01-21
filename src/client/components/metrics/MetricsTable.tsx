import React from "react";
import MetricsTableHead from "./MetricsTableHead";
import MetricsTableBody from "./MetricsTableBody";
interface Props {
  state: any;
  dispatch: any;
}
const MetricsTable: React.FC<Props> = props => {
  return (
    <table className="table songs-table">
      <MetricsTableHead {...props} />
      <MetricsTableBody {...props} />
    </table>
  );
};

export default MetricsTable;
