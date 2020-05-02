import React, { useState, useMemo } from 'react';
import qs from 'qs';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import useResource from '../hooks/useResource';
import SongTable from '../components/SongTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const SongsPage: React.FC = () => {
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
    console.log(`/songs?${str}`);
    return `/songs?${str}`;
  }, [category, search, isArchived]);

  const [{ songs }, error, isFetching] = useResource(url, {
    songs: [],
  });
  console.log(songs);

  return (
    <Layout>
      <div className="container py-3">
        <ErrorMessage error={error} className="mb-3" />
        <SearchInput
          callback={setSearch}
          delay={300}
          setLoading={setSearching}
          placeholder="Search title..."
          className="form-control"
        />
        <div className="py-3 d-flex justify-content-between">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button
              type="button"
              className={`btn btn-outline-primary btn-sm${
                category === 'A' ? ' active' : ''
              }`}
              onClick={() => setCategory('A')}
            >
              Category A
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary btn-sm${
                category === 'B' ? ' active' : ''
              }`}
              onClick={() => setCategory('B')}
            >
              Category B (Hymn)
            </button>
          </div>
          <button
            type="button"
            className={`btn btn-outline-primary btn-sm${
              isArchived ? ' active' : ''
            }`}
            onClick={() => setArchived(!isArchived)}
          >
            {isArchived ? 'Hide archived' : 'Show archived'}
          </button>
        </div>
        <div className="relative">
          <Loader loading={isFetching || isSearching} />
          <SongTable songs={songs} />
        </div>
      </div>
    </Layout>
  );
};

export default SongsPage;
