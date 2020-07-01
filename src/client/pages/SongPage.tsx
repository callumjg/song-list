import React from 'react';
import useSWR from 'swr';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LabelledTable from '../components/tables/LabelledTable';
import ErrorMessage from '../components/ErrorMessage';
import Card from '../components/Card';
import Table from '../components/tables/Table';

const SongPage: React.FC = () => {
  const { songId } = useParams();
  const { data, error } = useSWR(`/songs/${songId}`);
  const song = data?.song;

  const labelledTable = [
    ['Author', song?.author],
    ['Key', song?.key],
    ['Tempo', song?.tempo],
    [
      'Song Select ID',
      song?.songSelectId && (
        <a
          href={`https://songselect.ccli.com/Songs/${song?.songSelectId}`}
          target="__blank"
          rel="noopener noreferrer"
        >
          <span className="mr-1">{song?.songSelectId}</span>
          <ion-icon name="open-outline" />
        </a>
      ),
    ],
    [
      'URL',
      song?.url && (
        <a href={song.url} target="__blank" rel="noopener noreferrer">
          <span className="mr-1">Watch</span>
          <ion-icon name="open-outline" />
        </a>
      ),
    ],
  ];

  return (
    <Layout>
      <ErrorMessage error={error} />
      <div className="relative container py-4">
        <Card className="p-3">
          <h3>{song?.title}</h3>
          <LabelledTable data={labelledTable} />
        </Card>
        <Card className="p-3">
          <h3>Tags</h3>
          <Table
            columns={[{ target: 'tag' }]}
            data={song?.tags.map((tag, id) => ({ tag, id }))}
            keyId="id"
            noHeader
          />
        </Card>
        <Card className="p-3">
          <h3>Notes</h3>
          {song?.notes.length ? (
            <Table
              columns={[{ target: 'note' }]}
              data={song?.notes.map((note, id) => ({ note, id }))}
              keyId="id"
              noHeader
            />
          ) : (
            <p>Nothing to display</p>
          )}
        </Card>
        {/* <Card className="p-3">
          <h3>Lyrics</h3>
        </Card> */}
      </div>
    </Layout>
  );
};

export default SongPage;
