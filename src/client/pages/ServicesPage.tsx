import React from 'react';
import Layout from '../components/Layout';
import useResource from '../hooks/useResource';
import Loader from '../components/Loader';
import ServiceTable from '../components/tables/ServiceTable';
import ErrorMessage from '../components/ErrorMessage';

const ServicesPage: React.FC = () => {
  const [{ services }, error, isFetching] = useResource('/services', {
    count: 0,
    services: [],
  });

  return (
    <Layout>
      <ErrorMessage error={error} />
      <div className="relative container py-4">
        <Loader loading={isFetching} />
        <ServiceTable services={services} />
      </div>
    </Layout>
  );
};

export default ServicesPage;
