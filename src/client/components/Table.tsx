import React from 'react';

export interface Column {
  header: string | JSX.Element | null;
  render?: (
    value: any,
    row: any,
    coords: number[]
  ) => string | number | JSX.Element | null;
  target?: string;
  sortFunc?: (a, b) => number;
  sortable?: boolean;
  className?: string;
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

interface Props {
  data: any[];
  keyId: string;
  columns: Column[];
  className?: string;
  style?: React.CSSProperties;
}

export const Table: React.FC<Props> = ({
  data = [],
  keyId,
  columns,
  className,
  style: tableStyle,
}) => {
  let classes = 'table';
  if (className) classes += ` ${className}`;

  const renderHeadings = () =>
    columns.map((col, i) => (
      <th
        key={`h${i}`}
        className={col.className}
        style={{ ...col.style, ...col.headStyle }}
      >
        {col.header}
      </th>
    ));

  const renderColumn = (row, rowIndex) => (col, columnIndex) => {
    const coord = [rowIndex, columnIndex];
    const content = col.render
      ? col.render(row[col.target], row, coord)
      : row[col.target];
    let classes = '';
    if (col.className) classes += ` ${col.className}`;
    return (
      <td
        className={classes}
        key={coord.join(',')}
        style={{ ...col.style, ...col.bodyStyle }}
      >
        {content}
      </td>
    );
  };

  const renderBody = () =>
    data.map((row, index) => (
      <tr key={row[keyId]}>{columns.map(renderColumn(row, index))}</tr>
    ));

  return (
    <table className={classes} style={tableStyle}>
      <thead>
        <tr>{renderHeadings()}</tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
};

export default Table;
