import React, { useState, useContext } from 'react';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Layout from '../components/Layout';
import SongTable from '../components/tables/SongTable';
import ErrorMessage from '../components/ErrorMessage';
import Tabs from '../components/Tabs';
import { AuthContext } from '../components/Auth';
import Card from '../components/Card';

const SongsPage = () => {
  const history = useHistory();
  const [isArchived, setArchived] = useState(false);
  const { user } = useContext(AuthContext);
  const [cat, setCategory] = useState('A');
  const category = cat === 'A' ? 'Category A' : 'Category B (Hymn)';
  const { data, error, isValidating } = useSWR('/songs');
  const { data: serviceData, error: serviceError } = useSWR(
    '/services/closest'
  );
  const service = serviceData ? serviceData?.service : null;
  const onAddSongClick = () => history.push(`/songs/add?category=${category}`);
  const onArchiveClick = () => setArchived(!isArchived);
  const onTabSelect = (selected) => {
    const tab = selected === 'Category A' ? 'A' : 'B';
    setCategory(tab);
  };

  const songs = data?.songs.filter((song) => {
    const pattern = new RegExp(`Category ${cat}`, 'i');
    const matchCat = song.tags.some((t) => t.match(pattern));
    const matchArchived = song.isArchived === isArchived;
    return matchCat && matchArchived;
  });

  return (
    <Layout activeTab="Songs">
      <ErrorMessage error={error || serviceError} />
      {service && (
        <div className="mt-5 container-fluid" style={{ maxWidth: '70rem' }}>
          <Card className="p-5">
            <h3>Recent Songs</h3>
            <h6>{moment(service?.date).format('DD/MM/Y')}</h6>
            {service?.songs.map((s) => (
              <button
                key={s.songId}
                onClick={() => {
                  history.push(`/song/${s.songId}`);
                }}
                className="btn btn-outline-primary mr-3 mt-3"
              >
                {s.title}
              </button>
            ))}
          </Card>
        </div>
      )}
      <div className="container-fluid my-5" style={{ maxWidth: '70rem' }}>
        <Tabs
          tabs={['Category A', 'Hymn']}
          onClick={onTabSelect}
          leftWidth="1rem"
          className="mb-5"
        >
          <div className="d-flex align-items-start">
            {user && (
              <button
                className="btn btn-outline-primary btn-sm mx-2"
                type="button"
                onClick={onAddSongClick}
                title="Add new song"
              >
                <ion-icon name="add" />
              </button>
            )}
            <button
              type="button"
              className={`btn btn-outline-primary mr-2 btn-sm${
                isArchived ? ' active' : ''
              }`}
              onClick={onArchiveClick}
              title={`${isArchived ? 'Hide' : 'Show'} archived songs`}
            >
              <ion-icon name="albums"></ion-icon>
            </button>
          </div>
        </Tabs>
        <div className="relative mb-3">
          <SongTable
            songs={songs}
            style={{ borderTopWidth: 0 }}
            isValidating={isValidating}
            placeholderRows={30}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SongsPage;
