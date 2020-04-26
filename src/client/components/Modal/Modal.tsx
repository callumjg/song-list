import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

/* 
	Modal component using bootstrap classes but without jquery.
	Required props: isOpen (bool), onDismiss (function)
	Optional props: children, title, footer, large, small
*/

interface Props {
  isOpen: boolean;
  onDismiss: (...args: any[]) => any;
  title?: string;
  footer?: string;
  large?: boolean;
  small?: boolean;
}
const Modal: React.FC<Props> = ({
  isOpen,
  onDismiss,
  title,
  footer,
  large,
  small,
  children,
}) => {
  const body = document.querySelector('body');
  const [display, setDisplay] = useState('none');
  const [show, setShow] = useState('');

  useEffect(() => {
    if (isOpen) {
      body.classList.add('modal-open');
      transitionIn();
    }
    if (!isOpen) {
      transitionOut();
      body.classList.remove('modal-open');
    }
    return () => body.classList.remove('modal-open');
  }, [isOpen, body.classList]);

  const transitionIn = () => {
    setDisplay('block');
    setTimeout(() => {
      setShow(' show');
    }, 50);
  };

  const transitionOut = () => {
    setShow('');
    setTimeout(() => {
      setDisplay('none');
    }, 100);
  };

  const renderModal = () => (
    <div>
      <div className={`modal-backdrop fade${show}`} style={{ display }} />
      <div
        className={`modal fade${show}`}
        onClick={onDismiss}
        style={{ display }}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${
            large ? 'modal-lg' : ''
          } ${small ? 'modal-sm' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content" onSubmit={(e) => e.stopPropagation()}>
            <ModalHeader title={title} onDismiss={onDismiss} />
            <div className="modal-body">{children}</div>
            <ModalFooter footer={footer} />
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(renderModal(), document.querySelector('#modal'));
};

export default Modal;
