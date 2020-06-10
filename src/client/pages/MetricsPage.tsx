import React, { useState, useMemo } from 'react';
import qs from 'qs';
import Layout from '../components/Layout';
import useResource from '../hooks/useResource';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import MetricsTable from '../components/tables/MetricsTable';
import Tabs from '../components/Tabs';
import Selector from '../components/Selector';

const monthLabels = {
  All: undefined,
  '2yr': 24,
  '1yr': 12,
  '6mth': 6,
  '3mth': 3,
  '1mth': 1,
};

const tabs = ['Category A', 'Hymns'];

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

  const onSelectTab = (selected) => {
    const tab = selected === 'Category A' ? 'A' : 'B';
    setCategory(tab);
  };

  const onSelectMonth = (selected) => {
    setMonths(selected === 'All' ? undefined : selected);
  };

  return (
    <Layout>
      <div className="relative">
        <Loader loading={isLoading} />
        <ErrorMessage error={error} />
        <div className="container my-4">
          <Tabs
            tabs={tabs}
            onClick={onSelectTab}
            className="mb-4"
            leftWidth="1rem"
          >
            <div>
              <Selector
                options={monthLabels}
                onSelect={onSelectMonth}
                selected={months}
              />
            </div>
          </Tabs>
          <MetricsTable songs={songs} />
        </div>
      </div>
    </Layout>
  );
};

export default MetricsPage;
