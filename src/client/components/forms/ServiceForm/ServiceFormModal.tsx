import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import qs from 'qs';
import Modal from '../../Modal';
import ServiceForm from './ServiceForm';
import Service from '../../../../types/Service';
// import server from '../../../../apis/server';
// import { mutate } from 'swr';

const ServiceFormModal = () => {
  const { id } = useParams();
  const isEditForm = !!id;
  const history = useHistory();

  const onSubmit = async (values, actions, modalActions) => {
    // const method = isEditForm ? 'patch' : 'post';
    console.log(values);
    // const { data } = await server[method]('/songs', values);
    // mutate('/songs', (state) => {
    //   state.songs = [...state.songs, data.song];
    //   return state;
    // });
    // actions.setSubmitting(false);
    // modalActions.onDismiss();
  };

  const getInitialValues = () => {
    const iv: Partial<Service> = {};
    return iv;
  };

  const getTitle = () => {
    let title = isEditForm ? `Edit Service` : 'New Service';
    return title;
  };

  return (
    <Modal title={getTitle()} isOpen={true} onDismiss={() => history.push('/')}>
      {({ wrapCallback }) => (
        <ServiceForm
          isEditForm={isEditForm}
          onSubmit={wrapCallback(onSubmit)}
          initialValues={getInitialValues()}
        />
      )}
    </Modal>
  );
};

export default ServiceFormModal;
