import React from 'react';
import Service from '../../types/Service';
import { Table, Column } from './Table';
import moment from 'moment';
interface Props {
  services: Service[];
}

const ServiceTable = ({ services }) => {
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
    <Table
      data={services}
      keyId="serviceId"
      columns={columns}
      className="table-sm"
      style={{ fontSize: '90%' }}
    />
  );
};

export default ServiceTable;
