import React from 'react';
import Modal from '../../Modal';
import SongForm from './SongForm';
import history from '../../../constants/history';
const SongFormModal = () => {
  return (
    <Modal isOpen={true} onDismiss={() => history.push('/')}>
      <SongForm />
    </Modal>
  );
};

export default SongFormModal;
