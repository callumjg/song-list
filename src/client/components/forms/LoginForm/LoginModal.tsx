import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Modal from '../../Modal';
import LoginForm from './LoginForm';

const LoginModal = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const onDismiss = () => {
    history.push(location.pathname.replace('/login', ''));
  };
  return (
    <Modal isOpen onDismiss={onDismiss} title="Login">
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
