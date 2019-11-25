import React from "react";

function RangeButtons(props) {
  const rangeButtons = [
    ["Total", undefined],
    ["2yrs", 24],
    ["1yr", 12],
    ["6mths", 6],
    ["3mths", 3],
    ["1mth", 1]
  ];
  return (
    <div className="btn-group btn-group-toggle">
      {rangeButtons.map(([label, r], i) => (
        <button
          key={i}
          type="button"
          onClick={() => props.setRange(r)}
          className={`btn btn-sm btn-outline-secondary no-glow${
            props.range === r ? " active" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default RangeButtons;
