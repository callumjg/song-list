import React from 'react';
import Layout from '../components/Layout';
import ServiceTable from '../components/tables/ServiceTable';
import ErrorMessage from '../components/ErrorMessage';
import useSWR from 'swr';

const ServicesPage: React.FC = () => {
  const { data, error } = useSWR('/services');

  return (
    <Layout>
      <ErrorMessage error={error} />
      <div className="relative container py-4">
        <ServiceTable services={data?.services} placeholderRows={30} />
      </div>
    </Layout>
  );
};

export default ServicesPage;
