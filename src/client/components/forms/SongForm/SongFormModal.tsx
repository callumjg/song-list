import React from 'react';
import { useParams } from 'react-router';
import Modal from '../../Modal';
import SongForm from './SongForm';
import history from '../../../constants/history';

const SongFormModal = () => {
  const { id } = useParams();
  const isEditForm = !!id;
  const title = isEditForm ? `Edit Song` : 'New Song';
  return (
    <Modal title={title} isOpen={true} onDismiss={() => history.push('/')}>
      <SongForm isEditForm={isEditForm} />
    </Modal>
  );
};

export default SongFormModal;
