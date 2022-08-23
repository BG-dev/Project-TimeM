import React from "react";
import "./ConfirmForm.scss";

function ConfirmForm({ text, confirmHandler, setActive }) {
  return (
    <div className="confirm-form">
      <span className="confirm-form__text">{text}</span>
      <div className="confirm-form__control">
        <button
          onClick={(event) => confirmHandler(event)}
          className="btn btn-blue"
        >
          Yes
        </button>
        <button onClick={() => setActive(false)} className="btn btn-red">
          No
        </button>
      </div>
    </div>
  );
}

export default ConfirmForm;
