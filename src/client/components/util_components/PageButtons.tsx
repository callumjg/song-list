import React from "react";

const PageButtons: React.FC = ({ page, pagesNum, setPage }) => {
  if (pagesNum < 2) return null;
  let pages = [];
  for (let i = 1; i <= pagesNum; i++) {
    pages.push(
      <button
        className={`btn btn-sm no-glow btn-outline-secondary${
          i === page + 1 ? " active" : ""
        }`}
        onClick={() => setPage(i - 1)}
        key={i}
      >
        {i}
      </button>
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="btn-group btn-group-toggle">{pages}</div>
    </div>
  );
};

export default PageButtons;
