import React, { useState, useMemo, useCallback } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import useResource from '../hooks/useResource';
import SongTable from '../components/tables/SongTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Tabs from '../components/Tabs';
import history from '../constants/history';
import { setSongs } from '../actions/songs';

const selectSongs = (state) => state.songs;

const SongsPage = () => {
  const [isSearching, setSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [isArchived, setArchived] = useState(false);
  const [cat, setCategory] = useState('A');
  const songs = useSelector(selectSongs);
  const dispatch = useDispatch();
  const onChange = useCallback(({ songs }) => dispatch(setSongs(songs)), [
    dispatch,
  ]);
  const category = cat === 'A' ? 'Category A' : 'Category B (Hymn)';

  // Get url with query string
  const url = useMemo(() => {
    const str = qs.stringify({
      tags: [category],
      search,
      isArchived,
    });
    return `/songs?${str}`;
  }, [category, search, isArchived]);

  // Get songs
  const { error, isLoading: isFetching } = useResource(
    url,
    { songs: [] },
    { onChange }
  );
  const onTabSelect = (selected) => {
    const tab = selected === 'Category A' ? 'A' : 'B';
    setCategory(tab);
  };
  return (
    <Layout noHeader>
      <div className="py-5">
        <ErrorMessage error={error} />
        <div className="spaced pb-4">
          {/* <SearchInput
            callback={setSearch}
            delay={300}
            setLoading={setSearching}
            placeholder="Search title..."
            className="form-control"
          /> */}
          <Tabs tabs={['Category A', 'Hymn']} onClick={onTabSelect} leadingLine>
            <button
              className="btn btn-outline-primary btn-sm mx-2"
              type="button"
              onClick={() => history.push(`/songs/add?category=${category}`)}
              title="Add new song"
              style={{ minWidth: '2.5rem' }}
            >
              <ion-icon name="add" />
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary btn-sm${
                isArchived ? ' active' : ''
              }`}
              onClick={() => setArchived(!isArchived)}
              title={`${isArchived ? 'Hide' : 'Show'} archived songs`}
              style={{ minWidth: '2.5rem' }}
            >
              <ion-icon name="albums"></ion-icon>
            </button>
          </Tabs>
        </div>

        <div className="relative">
          <Loader loading={isFetching || isSearching} />
          <SongTable
            songs={songs}
            className="table-sm table-dark"
            style={{ fontSize: '90%' }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SongsPage;
