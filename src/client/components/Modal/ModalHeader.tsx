import React from 'react';

const ModalHeader: React.FC<{
  title: string;
  onDismiss: (...args: any[]) => any;
}> = ({ title, onDismiss }) => {
  return (
    <div className={title ? 'modal-header' : 'container-fluid p-2'}>
      {title && <h5 className="modal-title">{title}</h5>}
      <button type="button" className="close" onClick={onDismiss}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
export default ModalHeader;
