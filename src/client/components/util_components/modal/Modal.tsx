import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";

/* 
	Modal component using bootstrap classes but without jquery.
	Required props: isOpen (bool), onDismiss (function)
	Optional props: children, title, footer, large, small
*/
const Modal: React.FC = props => {
  const body = document.querySelector("body");
  const [display, setDisplay] = useState("none");
  const [show, setShow] = useState("");

  useEffect(() => {
    if (props.isOpen) {
      body.classList.add("modal-open");
      transitionIn();
    }
    if (!props.isOpen) {
      transitionOut();
      body.classList.remove("modal-open");
    }
    return () => body.classList.remove("modal-open");
  }, [props.isOpen, body.classList]);

  const transitionIn = () => {
    setDisplay("block");
    setTimeout(() => {
      setShow(" show");
    }, 50);
  };

  const transitionOut = () => {
    setShow("");
    setTimeout(() => {
      setDisplay("none");
    }, 100);
  };

  const renderModal = () => (
    <div>
      <div className={`modal-backdrop fade${show}`} style={{ display }} />
      <div
        className={`modal fade${show}`}
        onClick={props.onDismiss}
        style={{ display }}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${
            props.large ? "modal-lg" : ""
          } ${props.small ? "modal-sm" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-content" onSubmit={e => e.stopPropagation()}>
            <ModalHeader title={props.title} onDismiss={props.onDismiss} />
            <div className="modal-body">{props.children}</div>
            <ModalFooter footer={props.footer} />
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(renderModal(), document.querySelector("#modal"));
};

export default Modal;
