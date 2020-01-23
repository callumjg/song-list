import React, { useState, useMemo } from "react";
import useResource from "../../hooks/useResource";
import PageButtons from "../../components/util_components/PageButtons";
import ServicesTable from "./ServicesTable";
import ServiceForm from "./ServiceForm";
import Limiter from "../../components/util_components/Limiter";
import Loader from "../../components/util_components/Loader";
import Modal from "../../components/util_components/Modal";
import server from "../../apis/server";

const ServicesList: React.FC = props => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const url = useMemo(() => {
    let url = `/services?limit=${limit}`;
    if (typeof limit === "number") url += `&skip=${limit * page}`;
    return url;
  }, [limit, page]);

  const [{ count, services }, error, isFetching, refreshServices] = useResource(
    url,
    {
      count: 0,
      services: []
    }
  );

  const onSubmit = async (formValues: any) => {
    setIsLoading(true);
    try {
      await server.post("/services", formValues);
      setIsModalOpen(false);
      refreshServices();
    } catch (e) {
      let message = e.response ? e.response.data.message : e.message;
      setSubmitError(message);
    }
    setIsLoading(false);
  };

  const deleteService = async (_id: string) => {
    setIsLoading(true);
    try {
      await server.delete(`/services/${_id}`);
      refreshServices();
    } catch (e) {
      let message = e.response ? e.response.data.message : e.message;
      setSubmitError(message);
    }
    setIsLoading(false);
  };

  return (
    <section className="container relative py-3">
      <h4>Services</h4>
      {error ||
        (submitError && (
          <p className="alert alert-danger my-2 p-2">{error || submitError}</p>
        ))}
      <div className="d-flex justify-content-between align-items-start">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="ui plus icon" /> Add Service
        </button>
        <Limiter
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
          limitButtons={[5, 10, 20]}
        />
      </div>
      <div className="relative">
        <Loader loading={isFetching || isLoading}>
          <ServicesTable services={services} deleteService={deleteService} />
        </Loader>
      </div>
      <PageButtons
        page={page}
        pagesNum={Math.ceil(count / limit)}
        setPage={setPage}
      />
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        large
        title="New Service"
      >
        <ServiceForm
          onDismiss={() => setIsModalOpen(false)}
          onSubmit={onSubmit}
        />
      </Modal>
    </section>
  );
};

export default ServicesList;
