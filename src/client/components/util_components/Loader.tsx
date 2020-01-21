import React from "react";
import "./Loader.scss";

interface Props {
  loading: boolean;
}
const Loader: React.FC<Props> = ({ loading, children }) => {
  if (!loading) return children;
  return (
    <div>
      <div className="loader">
        <div />
      </div>
      {children}
    </div>
  );
};

export default Loader;
