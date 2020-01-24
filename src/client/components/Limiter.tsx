import React from "react";
interface Props {
  setLimit: (...args: any[]) => void;
  limitButtons: (number | string)[];
  setPage: (page: number) => void;
  limit: number | string;
}
const Limiter: React.FC<Props> = ({
  setLimit,
  limitButtons,
  setPage,
  limit
}) => {
  function onClick(v: number | string) {
    setLimit(v);
    setPage(0);
  }
  return (
    <div>
      <span className="mr-2">Limit: </span>
      <div className="btn-group btn-group-toggle">
        {limitButtons.map((p: number, i: number) => (
          <button
            className={`btn btn-sm no-glow btn-outline-secondary${
              limit === p ? " active" : ""
            }`}
            key={i}
            onClick={() => onClick(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Limiter;
