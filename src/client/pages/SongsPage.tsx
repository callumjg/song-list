import React, { useState, useMemo, useCallback } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import useResource from '../hooks/useResource';
import SongTable from '../components/tables/SongTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
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

  return (
    <Layout>
      <div className="container py-4">
        <ErrorMessage error={error} />
        <div className="spaced pb-4">
          <SearchInput
            callback={setSearch}
            delay={300}
            setLoading={setSearching}
            placeholder="Search title..."
            className="form-control"
          />
          <div className="d-flex justify-content-between">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm${
                  cat === 'A' ? ' active' : ''
                }`}
                onClick={() => setCategory('A')}
                children="Category A"
              />
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm${
                  cat === 'B' ? ' active' : ''
                }`}
                onClick={() => setCategory('B')}
                children="Category B (Hymn)"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-primary btn-sm mx-2"
                type="button"
                onClick={() => history.push(`/songs/add?category=${category}`)}
              >
                <ion-icon name="add" />
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm${
                  isArchived ? ' active' : ''
                }`}
                onClick={() => setArchived(!isArchived)}
                children={isArchived ? 'Hide archived' : 'Show archived'}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <Loader loading={isFetching || isSearching} />
          <SongTable
            songs={songs}
            className="table-sm"
            style={{ fontSize: '90%' }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SongsPage;
