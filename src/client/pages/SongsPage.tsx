import React, { useState, useContext } from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import SongTable from '../components/tables/SongTable';
import ErrorMessage from '../components/ErrorMessage';
import Tabs from '../components/Tabs';
import history from '../constants/history';
import { AuthContext } from '../components/Auth';

const SongsPage = () => {
  const [isArchived, setArchived] = useState(false);
  const { user } = useContext(AuthContext);
  const [cat, setCategory] = useState('A');
  const category = cat === 'A' ? 'Category A' : 'Category B (Hymn)';
  const { data, error, isValidating } = useSWR('/songs');

  const songs = data?.songs.filter((song) => {
    const pattern = new RegExp(`Category ${cat}`, 'i');
    const matchCat = song.tags.some((t) => t.match(pattern));
    const matchArchived = song.isArchived === isArchived;
    return matchCat && matchArchived;
  });

  const onTabSelect = (selected) => {
    const tab = selected === 'Category A' ? 'A' : 'B';
    setCategory(tab);
  };

  return (
    <Layout>
      <div>
        <ErrorMessage error={error} />
        <div className="pt-4 container">
          <Tabs
            tabs={['Category A', 'Hymn']}
            onClick={onTabSelect}
            leftWidth="1rem"
            className="mb-4"
          >
            <div className="d-flex align-items-start">
              {user && (
                <button
                  className="btn btn-outline-primary btn-sm mx-2"
                  type="button"
                  onClick={() =>
                    history.push(`/songs/add?category=${category}`)
                  }
                  title="Add new song"
                >
                  <ion-icon name="add" />
                </button>
              )}
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm${
                  isArchived ? ' active' : ''
                }`}
                onClick={() => setArchived(!isArchived)}
                title={`${isArchived ? 'Hide' : 'Show'} archived songs`}
              >
                <ion-icon name="albums"></ion-icon>
              </button>
            </div>
          </Tabs>

          <div className="relative">
            <SongTable
              songs={songs}
              className="table-sm"
              style={{ fontSize: '90%', borderTopWidth: 0 }}
              isValidating={isValidating}
              placeholderRows={30}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SongsPage;
