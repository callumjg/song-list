import React from 'react';
import { useHistory } from 'react-router-dom';
import SongType from '../../../types/Song';
import { Column, Table } from './Table';
import sortAlphabetically from '../../../utils/sortAlphabetically';
import { Props as TableProps } from './Table';

interface Props extends Partial<TableProps> {
  songs: SongType[];
  className?: string;
  style?: React.CSSProperties;
  isValidating?: boolean;
  placeholderRows?: number;
}

const columns: Column[] = [
  {
    target: 'title',
    header: <ion-icon name="musical-notes-outline" />,
    style: { paddingLeft: '2%' },
    sortFunc: sortAlphabetically,
  },
  { target: 'author', header: <ion-icon name="person-outline" /> },
  {
    target: 'key',
    header: <ion-icon name="key-outline" />,
    style: { minWidth: '3rem' },
  },
];
const SongTable: React.FC<Props> = ({ songs, className, ...props }) => {
  let classes = 'table-hover';
  if (className) classes += ` ${className}`;
  const history = useHistory();
  const onRowClick = (e, row) => {
    history.push(`/songs/${row.songId}`);
  };
  const trStyle = { cursor: 'pointer' };

  return (
    <Table
      data={songs}
      keyId="songId"
      columns={columns}
      onRowClick={onRowClick}
      trStyle={trStyle}
      className={classes}
      {...props}
    />
  );
};

export default SongTable;
