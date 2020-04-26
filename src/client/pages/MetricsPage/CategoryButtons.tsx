import React from 'react';

interface Props {
  setCategory: (category: RegExp) => void;
  category: RegExp;
}

type CategoryButton = [String, () => void];

const CategoryButtons: React.FC<Props> = ({ setCategory, category }) => {
  const categoryButtons: CategoryButton[] = [
    ['Category A', () => setCategory(/Category A/i)],
    ['Category B (Hymn)', () => setCategory(/Category B/gi)],
  ];
  return (
    <div className="btn-group btn-group-toggle">
      {categoryButtons.map(([label, onClick], i) => (
        <button
          key={i}
          type="button"
          onClick={onClick}
          className={`btn btn-sm btn-outline-primary no-glow${
            label.match(category) ? ' active' : ''
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
