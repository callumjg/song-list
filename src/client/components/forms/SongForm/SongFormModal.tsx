import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router';
import qs from 'qs';
import Modal from '../../Modal';
import SongForm from './SongForm';
import Song from '../../../../types/Song';
import server from '../../../../apis/server';
import { mutate } from 'swr';

const SongFormModal = () => {
  const { id } = useParams<{id: string}>();
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const isEditForm = !!id;

  const onSubmit = async (values, actions, modalActions) => {
    const method = isEditForm ? 'patch' : 'post';
    const { data } = await server[method]('/songs', values);
    mutate('/songs', (state) => {
      state.songs = [...state.songs, data.song];
      return state;
    });
    actions.setSubmitting(false);
    modalActions.onDismiss();
  };

  const getInitialValues = () => {
    const iv: Partial<Song> = {};
    if (query.category) iv.tags = [query.category];
    return iv;
  };

  const getTitle = () => {
    let title = isEditForm ? `Edit Song` : 'New Song';
    if (query.category) title += ` (${query.category})`;
    return title;
  };

  return (
    <Modal title={getTitle()} isOpen onDismiss={() => history.push('/')} large>
      {({ wrapCallback }) => (
        <SongForm
          isEditForm={isEditForm}
          onSubmit={wrapCallback(onSubmit)}
          initialValues={getInitialValues()}
        />
      )}
    </Modal>
  );
};

export default SongFormModal;
