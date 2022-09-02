import React from "react";
import "./ConfirmForm.scss";

function ConfirmForm({ text, confirmHandler, setActive }) {
  const handleClickAction = (event) => {
    setActive(false);
    confirmHandler(event);
  };

  return (
    <div className="confirm-form">
      <span className="confirm-form__text">{text}</span>
      <div className="confirm-form__control">
        <button
          onClick={(event) => handleClickAction(event)}
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
