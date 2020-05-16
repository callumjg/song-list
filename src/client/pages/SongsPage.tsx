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
    return `/songs?${str}`;
  }, [category, search, isArchived]);

  const [{ songs }, error, isFetching] = useResource(url, {
    songs: [],
  });

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
          <div className="">
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
              className={`btn btn-outline-primary ml-3 btn-sm${
                isArchived ? ' active' : ''
              }`}
              onClick={() => setArchived(!isArchived)}
            >
              {isArchived ? 'Hide archived' : 'Show archived'}
            </button>
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