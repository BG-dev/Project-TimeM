import React, { useEffect, useState } from "react";
import "./EditBoardForm.scss";
import { Button, Form, Input } from "antd";
import { ColorSelector } from "..";
import colors from "../../service/colors";
import boardApi from "../../api/boardApi";
import { setBoard } from "../../redux/features/boardSlice";
import IBoard from "../../types/board";
import { useAppDispatch } from "../../redux/hooks";
import { useAlert } from "../../hooks/alert.hook";
import { useServerError } from "../../hooks/serverError.hook";
import {
  boardDescriptionValidation,
  boardNameValidation,
} from "../../utils/validations";

interface IEditBoardFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  board: IBoard | null;
}

interface IFormValues {
  name: string;
  description: string;
}

function EditBoardForm({ setActiveModal, board }: IEditBoardFormProps) {
  const dispatch = useAppDispatch();
  const [acitveColor, setActiveColor] = useState<number>(0);
  const { setAlertState } = useAlert();
  const { handleServerError } = useServerError();

  const editBoard = async (boardData: IBoard) => {
    if (!board) return;
    try {
      if (board.id) {
        const { message } = (await boardApi.update(board.id, boardData)).data;
        const { board: updatedBoard } = (await boardApi.getOne(board.id)).data;
        dispatch(setBoard(updatedBoard));
        setAlertState(message, "success");
      }
    } catch (error) {
      setAlertState(handleServerError(error), "error");
    }
  };

  const submitForm = (values: IFormValues) => {
    const boardData: IBoard = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[acitveColor],
      },
    };

    editBoard(boardData);
    setActiveModal(false);
  };

  useEffect(() => {
    setActiveColor(
      colors.findIndex((color) => color.value === board?.color.value),
    );
  }, [board]);

  return (
    board && (
      <div className="custom-form">
        <h2 className="custom-form__title">Edit board</h2>
        <Form
          className="custom-form__container"
          layout="vertical"
          initialValues={{
            name: board.name,
            description: board.description,
          }}
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
            activeColor={acitveColor}
            setActiveColor={setActiveColor}
            colors={colors}
          />
          <div className="custom-form__control">
            <Button htmlType="submit" type="primary" size="large">
              Save
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditBoardForm;
