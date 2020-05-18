import React, { useState, useMemo, useEffect } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import useResource from '../hooks/useResource';
import SongTable from '../components/tables/SongTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import history from '../constants/history';
import { setSongs } from '../actions/songs';

const SongsPage = ({ songs, setSongs, ...props }) => {
  const [isSearching, setSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [isArchived, setArchived] = useState(false);
  const [category, setCategory] = useState('A');
  const url = useMemo(() => {
    const cat = category === 'A' ? 'Category A' : 'Category B (Hymn)';
    const str = qs.stringify({
      tags: [cat],
      search,
      isArchived,
    });
    return `/songs?${str}`;
  }, [category, search, isArchived]);

  const [{ songs: fetchedSongs }, error, isFetching] = useResource(url, {
    songs: [],
  });

  useEffect(() => {
    setSongs(fetchedSongs);
  }, [fetchedSongs]);

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
                  category === 'A' ? ' active' : ''
                }`}
                onClick={() => setCategory('A')}
                children="Category A"
              />
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm${
                  category === 'B' ? ' active' : ''
                }`}
                onClick={() => setCategory('B')}
                children="Category B (Hymn)"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-primary btn-sm mx-2"
                type="button"
                onClick={() => history.push('/songs/add')}
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

const mapStateToProps = (state) => ({
  songs: state.songs,
});

export default connect(mapStateToProps, { setSongs })(SongsPage);
