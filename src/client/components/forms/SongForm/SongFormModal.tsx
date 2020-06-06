import React from 'react';
import { useParams } from 'react-router';
import Modal from '../../Modal';
import SongForm from './SongForm';
import history from '../../../constants/history';
import { useDispatch } from 'react-redux';
import { postSong, patchSong } from '../../../actions/songs';

const SongFormModal = () => {
  const { id } = useParams();
  const isEditForm = !!id;
  const title = isEditForm ? `Edit Song` : 'New Song';
  const dispatch = useDispatch();

  const onSubmit = async (values, actions, modalActions) => {
    isEditForm
      ? await dispatch(patchSong(values))
      : await dispatch(postSong(values));
    actions.setSubmitting(false);
    modalActions.onDismiss();
  };

  return (
    <Modal title={title} isOpen={true} onDismiss={() => history.push('/')}>
      {({ wrapCallback }) => (
        <SongForm isEditForm={isEditForm} onSubmit={wrapCallback(onSubmit)} />
      )}
    </Modal>
  );
};

export default SongFormModal;
