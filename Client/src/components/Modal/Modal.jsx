import React from "react";

import "./Modal.scss";

function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <i className="bx bx-x close-icon" onClick={() => setActive(false)}></i>
        {children}
      </div>
    </div>
  );
}

export default Modal;
