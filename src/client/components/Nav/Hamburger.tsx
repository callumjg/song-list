import React from "react";
import "./Hamburger.scss";

interface Props {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
