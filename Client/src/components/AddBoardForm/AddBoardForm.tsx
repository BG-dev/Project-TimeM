import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import colors from '../../service/colors';
import boardApi from '../../api/boardApi';
import IBoard from '../../types/board';
import useAlert from '../../hooks/alert.hook';
import useServerError from '../../hooks/serverError.hook';
import {
  boardDescriptionValidation,
  boardNameValidation,
} from '../../utils/validations';
import './AddBoardForm.scss';
import ColorSelector from '../ColorSelector';

interface IAddBoardFormProps {
  setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormValues {
  name: string;
  description: string;
}

function AddBoardForm({ setBoards, setActiveModal }: IAddBoardFormProps) {
  const [activeColor, setActiveColor] = useState<number>(0);
  const { setAlertState } = useAlert();

  const { handleServerError } = useServerError();

  const createBoard = async (boardData: IBoard) => {
    try {
      if (!boardData) throw new Error('Error board creation');
      const response = await boardApi.create(boardData);
      const { board, message } = response.data;
      setBoards((prev) => [...prev, board]);
      setAlertState(message, 'success');
    } catch (error) {
      setAlertState(handleServerError(error), 'error');
    }
  };

  const submitForm = (values: IFormValues) => {
    const newBoardData = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[activeColor],
      },
    };

    createBoard(newBoardData);
    setActiveModal(false);
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Create new board</h2>
      <Form
        className="custom-form__container"
        layout="vertical"
        onFinish={submitForm}
      >
        <Form.Item<IFormValues>
          label="Name"
          name="name"
          validateFirst
          required={false}
          rules={boardNameValidation}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item<IFormValues>
          label="Description"
          name="description"
          validateFirst
          required={false}
          rules={boardDescriptionValidation}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <ColorSelector
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          colors={colors}
        />
        <div className="custom-form__control">
          <Button htmlType="submit" type="primary" size="large">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddBoardForm;
