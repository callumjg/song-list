import React from 'react';
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
const SongTable: React.FC<Props> = ({ songs, ...props }) => {
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
      style: { minWidth: '2rem' },
    },
    {
      target: 'tags',
      header: <ion-icon name="pricetags-outline" />,
      render: (tags) =>
        tags.filter((t) => !t.match(/Category [AB]/)).join(', '),
    },
    {
      target: 'url',
      header: <ion-icon name="link-outline" />,
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-youtube" />
          </a>
        ) : (
          '-'
        ),
    },
  ];
  return <Table data={songs} keyId="songId" columns={columns} {...props} />;
};

export default SongTable;
