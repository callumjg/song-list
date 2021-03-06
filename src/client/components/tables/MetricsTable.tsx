import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Column, Table } from './Table';
import Song from '../../types/Song';
import sortAlphabetically from '../../../utils/sortAlphabetically';
import { Props as TableProps } from './Table';

interface Props extends Partial<TableProps> {
  songs: Song[];
}

const columns: Column[] = [
  {
    header: 'Title',
    target: 'title',
    style: { paddingLeft: '1.5rem' },
    sortFunc: sortAlphabetically,
  },
  {
    header: 'Earliest Service',
    target: 'earliestService',
    render: (v) => moment(v).format('DD/MM/YYYY'),
    placeholder: '-',
    style: { textAlign: 'center' },
    sortFunc: (a, b) => (moment(a || 0).isBefore(moment(b || 0)) ? -1 : 1),
    sortDefault: -1,
  },
  {
    header: 'Plays',
    target: 'plays',
    placeholder: '0',
    style: { textAlign: 'center' },
    sortFunc: (a, b) => a - b,
    sortDefault: -1,
    sortPriority: 2,
  },
  {
    header: 'Wks Since Played',
    target: 'weeksSincePlayed',
    placeholder: '∞',
    style: { textAlign: 'center' },
    sortFunc: (a, b) => {
      a = a === 0 ? 0 : a || Infinity;
      b = b === 0 ? 0 : b || Infinity;
      return a - b;
    },
    sortPriority: 1,
  },
];

const MetricsTable: React.FC<Props> = ({ songs = [], className, ...props }) => {
  let classes = 'table-hover';
  if (className) classes += ` ${className}`;
  const history = useHistory();
  const avPlays = songs.length
    ? songs.reduce((acc, item) => item.plays + acc, 0) / songs.length
    : 0;

  const onRowClick = (e, row) => {
    history.push(`/song/${row.songId}`);
  };
  const trStyle = { cursor: 'pointer' };
  return (
    <Table
      data={songs}
      keyId="songId"
      columns={columns}
      trClassNames={(row) => (row.plays < avPlays ? 'text-danger' : '')}
      onRowClick={onRowClick}
      trStyle={trStyle}
      className={classes}
      {...props}
    />
  );
};

export default MetricsTable;
