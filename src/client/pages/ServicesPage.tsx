import React, { useState } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import ServiceTable from '../components/tables/ServiceTable';
import ErrorMessage from '../components/ErrorMessage';

const currentYear = parseInt(moment().format('Y'));
let years = [];
let count = 0;
while (count <= currentYear - 2018) {
  years.push(String(currentYear - count));
  count++;
}

const ServicesPage: React.FC = () => {
  const [year, setYear] = useState(years[0]);
  const url = `/services?year=${year}`;
  const { data, error } = useSWR(url);

  return (
    <Layout>
      <ErrorMessage error={error} />
      <div className="relative container-fluid py-4">
        <Tabs
          tabs={years}
          onClick={setYear}
          className="pb-4"
          leftWidth="1rem"
        />
        <ServiceTable services={data?.services} placeholderRows={30} />
      </div>
    </Layout>
  );
};

export default ServicesPage;
