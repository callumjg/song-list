import React from "react";
import "./Hamburger.scss";

interface Props {
  onClick: () => void;
}

const Hamburger: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="hamburger" onClick={onClick}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default Hamburger;
