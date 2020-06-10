import React from 'react';
import './Selector.scss';

interface Props {
  options: {};
  onSelect: (v) => void;
  selected: string | number;
}

const Selector: React.FC<Props> = ({ options = [], onSelect, selected }) => {
  const onChange = (e) => {
    onSelect(e.target.value);
  };
  return (
    <select
      value={selected}
      onChange={onChange}
      title="The time in which plays are counted."
      className="selector-dropdown"
    >
      {Object.keys(options).map((key) => (
        <option key={key} value={options[key]}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default Selector;
