import React from 'react';
import './ConfirmForm.scss';
import { Button } from 'antd';

interface IConfirmFormProps {
  text: string;
  confirmHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmForm({ text, confirmHandler, setActive }: IConfirmFormProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(false);
    confirmHandler(e);
  };

  return (
    <div className="confirm-form">
      <span className="confirm-form__text">{text}</span>
      <div className="confirm-form__control">
        <Button type="primary" onClick={handleClick}>
          Yes
        </Button>
        <Button type="primary" danger onClick={() => setActive(false)}>
          No
        </Button>
      </div>
    </div>
  );
}

export default ConfirmForm;
