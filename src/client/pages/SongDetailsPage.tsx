import React from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LabelledTable from '../components/tables/LabelledTable';
import ErrorMessage from '../components/ErrorMessage';
import Card from '../components/Card';
import Table from '../components/tables/Table';

const PlaceHolderTable = ({ children, data }) =>
  !data?.length ? <p>Nothing to display</p> : <>{children}</>;

const SongDetailsPage: React.FC = () => {
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

  const renderLyrics = () =>
    song?.lyrics &&
    song?.lyrics.map(({ label, lyrics }, i) => (
      <div key={i} className="py-3 text-center">
        <h5>{label}</h5>
        {lyrics.split('\n').map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    ));

  return (
    <Layout>
      <ErrorMessage error={error} />
      <div className="relative container-fluid py-4">
        <div className="row">
          <div className="col-lg-4">
            <Card className="p-3">
              <h3>{song?.title}</h3>
              <LabelledTable data={labelledTable} />
            </Card>
            <Card className="p-3">
              <h3>Tags</h3>
              <PlaceHolderTable data={song?.tags}>
                <Table
                  columns={[{ target: 'tag' }]}
                  data={song?.tags.map((tag, id) => ({ tag, id }))}
                  keyId="id"
                  noHeader
                />
              </PlaceHolderTable>
            </Card>
            <Card className="p-3">
              <h3>Notes</h3>
              <PlaceHolderTable data={song?.notes}>
                <Table
                  columns={[{ target: 'note' }]}
                  data={song?.notes.map((note, id) => ({ note, id }))}
                  keyId="id"
                  noHeader
                />
              </PlaceHolderTable>
            </Card>
          </div>
          <div className="col-lg-8">
            <Card className="p-3">
              {!song?.lyrics && <h3>Lyrics</h3>}
              <PlaceHolderTable data={song?.lyrics}>
                <div className="my-4">{renderLyrics()}</div>
              </PlaceHolderTable>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SongDetailsPage;
