import React from 'react';
import Layout from '../components/Layout';
import useResource from '../hooks/useResource';
import Loader from '../components/Loader';
import { Table, Column } from '../components/Table';
import moment from 'moment';
import ErrorMessage from '../components/ErrorMessage';

const ServicesPage: React.FC = () => {
  const [{ services }, error, isFetching] = useResource('/services', {
    count: 0,
    services: [],
  });

  const columns: Column[] = [
    {
      header: 'Date',
      target: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
      style: { minWidth: '25%', paddingLeft: '2%' },
    },
    {
      header: 'Notes',
      target: 'notes',
      style: { width: '35%' },
      render: (notes) =>
        notes.map((n) => (
          <p key={n} style={{ marginBottom: 0 }}>
            {n}
          </p>
        )),
    },
    {
      header: 'Songs',
      target: 'songs',
      style: { width: '40%' },
      render: (songs) => (
        <ol style={{ padding: 0, margin: 0 }}>
          {songs.map((s) => (
            <li key={s.songId}>
              <span>{s.title}</span>
            </li>
          ))}
        </ol>
      ),
    },
  ];

  return (
    <Layout>
      <ErrorMessage error={error} />
      <div className="relative container py-4">
        <Loader loading={isFetching} />
        <Table
          data={services}
          keyId="serviceId"
          columns={columns}
          className="table-sm"
          style={{ fontSize: '90%' }}
        />
      </div>
    </Layout>
  );
};

export default ServicesPage;
