import React from 'react';

const ModalFooter: React.FC<{ footer: string }> = ({ footer }) => {
  return footer ? <div className="modal-footer">{footer}</div> : null;
};

export default ModalFooter;
