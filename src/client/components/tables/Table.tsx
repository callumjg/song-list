import React, { useState } from 'react';
import Placeholder from '../Placeholder';

export interface Column {
  target: string;
  header?: string | JSX.Element | null;
  render?: (
    value: any,
    row: any,
    coords: number[]
  ) => string | number | JSX.Element | null;
  className?: string;
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  placeholder?: string;
  sortFunc?: (a, b) => number;
  sortDefault?: 1 | -1;
  sortPriority?: number;
}

export interface Props {
  data: any[];
  keyId: string;
  columns: Column[];
  className?: string;
  style?: React.CSSProperties;
  trClassNames?: (row: any, index?: number) => string | undefined;
  trStyle?:
    | ((row: any, index?: number) => React.CSSProperties)
    | React.CSSProperties;
  onRowClick?: (e: React.MouseEvent, row?: any, index?: number) => void;
  placeholderRows?: number;
  isValidating?: boolean;
  noHeader?: boolean;
}

export const Table: React.FC<Props> = ({
  data = [],
  keyId,
  columns,
  className,
  style: tableStyleProp,
  trClassNames,
  trStyle,
  placeholderRows,
  noHeader,
  onRowClick,
}) => {
  let tableClassName = 'table table-hover';
  if (className) tableClassName += ` ${className}`;

  const tableStyle = { marginBottom: 0, ...tableStyleProp };

  const [sortFunctions, _setSortFunctions] = useState(
    columns
      .filter((col) => col.sortFunc)
      .sort((a, b) => (a.sortPriority || 0) - (b.sortPriority || 0))
      .map((col) => {
        return {
          target: col.target,
          fn: col.sortFunc,
          asc: col.sortDefault || 1,
        };
      })
  );

  const setSortFunctions = (index) => {
    const newSort = [...sortFunctions];
    const [extract] = newSort.splice(index, 1);
    extract.asc *= -1;
    _setSortFunctions([...newSort, extract]);
  };

  const renderHeadings = () =>
    !noHeader &&
    columns.map((col, i) => {
      const sortIndex = sortFunctions.map((v) => v.target).indexOf(col.target);
      const sortable = sortIndex >= 0;
      const sortObj = sortFunctions[sortIndex];
      const { asc } = sortObj || {};
      const onClick = sortable ? () => setSortFunctions(sortIndex) : undefined;
      return (
        <th
          key={`h${i}`}
          className={col.className}
          style={{
            cursor: sortable ? 'pointer' : 'default',
            ...col.style,
            ...col.headStyle,
          }}
          onClick={onClick}
        >
          {col.header}
          {sortable && sortIndex + 1 === sortFunctions.length && (
            <span className="ml-2">
              <ion-icon
                name={asc > 0 ? 'chevron-up-outline' : 'chevron-down-outline'}
              />
            </span>
          )}
        </th>
      );
    });

  const renderColumn = (row, rowIndex) => (col, columnIndex) => {
    const coord = [rowIndex, columnIndex];
    let content = col.placeholder;
    if (row[col.target] !== undefined && row[col.target] !== null)
      content = col.render
        ? col.render(row[col.target], row, coord)
        : row[col.target];
    let classes = '';
    if (col.className) classes += ` ${col.className}`;
    return (
      <td
        className={classes}
        key={coord.join(',')}
        style={{
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          ...col.style,
          ...col.bodyStyle,
        }}
      >
        {content}
      </td>
    );
  };

  const sortData = (data, index) => {
    if (index === sortFunctions.length) return data;
    const { target, fn, asc } = sortFunctions[index];
    const sorted = data.sort((a, b) => fn(a[target], b[target]) * asc);
    return sortData(sorted, index + 1);
  };

  const sorted = sortData(data, 0);

  const renderBody = () => {
    // Render placeholder
    if (!sorted.length) {
      let placeholder = [];
      let count = placeholderRows;
      while (count) {
        placeholder.push(
          <tr key={count}>
            <td colSpan={Object.keys(columns).length}>
              <Placeholder style={{ margin: '0.3rem', height: '1.5rem' }} />
            </td>
          </tr>
        );
        count--;
      }
      return placeholder;
    }
    return sorted.map((row, index) => {
      const rowStyle =
        typeof trStyle === 'function' ? trStyle(row, index) : trStyle;
      return (
        <tr
          key={row[keyId]}
          className={trClassNames && trClassNames(row, index)}
          onClick={(e) => onRowClick && onRowClick(e, row, index)}
          style={rowStyle}
        >
          {columns.map(renderColumn(row, index))}
        </tr>
      );
    });
  };

  return (
    <div className="table-container">
      <table className={tableClassName} style={tableStyle}>
        <thead>
          <tr>{renderHeadings()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

export default Table;
