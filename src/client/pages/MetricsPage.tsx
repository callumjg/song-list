import React, { useState, useMemo } from 'react';
import qs from 'qs';
import Layout from '../components/Layout';
import useResource from '../hooks/useResource';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import MetricsTable from '../components/tables/MetricsTable';

const monthButtons = [
  ['All', undefined],
  ['2yr', 24],
  ['1yr', 12],
  ['6mth', 6],
  ['3mth', 3],
  ['1mth', 1],
];

const MetricsPage = () => {
  const [category, setCategory] = useState('A');
  const [months, setMonths] = useState(6);

  const url = useMemo(() => {
    const cat = category === 'A' ? 'Category A' : 'Category B (Hymn)';
    const str = qs.stringify({
      tags: [cat],
      months,
    });
    return `/songs/metrics?${str}`;
  }, [category, months]);

  const {
    data: { songs },
    error,
    isLoading,
  } = useResource(url, {
    songs: [],
  });

  return (
    <Layout>
      <div className="relative">
        <Loader loading={isLoading} />
        <ErrorMessage error={error} />
        <div className="container my-4">
          <div className="d-flex justify-content-between">
            <div
              className="btn-group btn-group-toggle mb-4"
              data-toggle="buttons"
            >
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
            <div
              className="btn-group btn-group-toggle mb-4"
              data-toggle="buttons"
            >
              {monthButtons.map(([label, m]) => (
                <button
                  key={label}
                  className={`btn btn-outline-primary btn-sm${
                    m === months ? ' active' : ''
                  }`}
                  onClick={() => setMonths(m as number)}
                  children={label}
                />
              ))}
            </div>
          </div>
          <MetricsTable songs={songs} />
        </div>
      </div>
    </Layout>
  );
};

export default MetricsPage;
