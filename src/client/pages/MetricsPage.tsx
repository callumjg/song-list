import React from 'react';
import moment from 'moment';

// import qs from 'qs';
import Layout from '../components/Layout';
// import SearchInput from '../components/SearchInput';
import useResource from '../hooks/useResource';
import { Column, Table } from '../components/Table';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
// import Collapsible from '../components/Collapsible';

const MetricsPage = () => {
  const [{ songs }, error, isLoading] = useResource('/songs/metrics', {
    songs: [],
  });

  // Average placement
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
    <Layout>
      <div className="relative">
        <Loader loading={isLoading} />
        <ErrorMessage error={error} />
        <div className="container py-4">
          <Table
            data={songs}
            keyId="songId"
            columns={columns}
            className="table-sm"
            style={{ fontSize: '90%' }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MetricsPage;
