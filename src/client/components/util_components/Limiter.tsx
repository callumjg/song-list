import React from "react";
const Limiter: React.FC = ({ setLimit, limitButtons, setPage, limit }) => {
  function onClick(v) {
    setLimit(v);
    setPage(0);
  }
  return (
    <div>
      <span className="mr-2">Limit: </span>
      <div className="btn-group btn-group-toggle">
        {limitButtons.map((p, i) => (
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
