import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Modal from '../../Modal';
import LoginForm from './LoginForm';

const LoginModal = () => {
  const history = useHistory();
  const location = useLocation();
  const onDismiss = () => {
    history.push(location.pathname.replace('/login', ''));
  };
  return (
    <Modal isOpen onDismiss={onDismiss} title="Login">
      {({ onDismiss }) => <LoginForm onLogin={onDismiss} />}
    </Modal>
  );
};

export default LoginModal;
