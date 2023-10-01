import React from "react";
import "./ConfirmForm.scss";

interface IConfirmFormProps {
  text: string;
  confirmHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmForm({ text, confirmHandler, setActive }: IConfirmFormProps) {
  const handleClickAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(false);
    confirmHandler(e);
  };

  return (
    <div className="confirm-form">
      <span className="confirm-form__text">{text}</span>
      <div className="confirm-form__control">
        <button
          onClick={handleClickAction}
          type="button"
          className="btn btn-blue"
        >
          Yes
        </button>
        <button
          onClick={() => setActive(false)}
          type="button"
          className="btn btn-red"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default ConfirmForm;
