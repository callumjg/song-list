import React from "react";

interface Props {
  range: number;
  setRange: (range: number | undefined) => void;
}

const RangeButtons: React.FC<Props> = ({ range, setRange }) => {
  const rangeButtons: [String, undefined | number][] = [
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
          onClick={() => setRange(r)}
          className={`btn btn-sm btn-outline-secondary no-glow${
            range === r ? " active" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default RangeButtons;
