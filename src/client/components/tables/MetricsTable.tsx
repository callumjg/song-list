import React from 'react';
import moment from 'moment';
import { Column, Table } from './Table';
import Song from '../../types/Song';

interface Props {
  songs: Song[];
}

const MetricsTable: React.FC<Props> = ({ songs }) => {
  const avPlays = songs.length
    ? songs.reduce((acc, item) => item.plays + acc, 0) / songs.length
    : 0;
  const columns: Column[] = [
    {
      header: 'Title',
      target: 'title',
      sortFunc: (a, b) => (a > b ? 1 : -1),
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
      sortFunc: (a, b) => (a || Infinity) - (b || Infinity),
      sortPriority: 1,
    },
  ];

  return (
    <Table
      data={songs}
      keyId="songId"
      columns={columns}
      className="table-sm"
      style={{ fontSize: '90%' }}
      trClassNames={(row) => (row.plays < avPlays ? 'text-danger' : '')}
    />
  );
};

export default MetricsTable;
