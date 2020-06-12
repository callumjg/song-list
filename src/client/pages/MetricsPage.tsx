import React, { useState, useMemo } from 'react';
import qs from 'qs';
import useSWR from 'swr';
import Layout from '../components/Layout';
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

  const { data, error } = useSWR(url);

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
          <MetricsTable songs={data?.songs} placeholderRows={30} />
        </div>
      </div>
    </Layout>
  );
};

export default MetricsPage;
