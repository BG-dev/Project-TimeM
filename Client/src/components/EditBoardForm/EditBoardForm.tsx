import React, { useEffect, useState } from "react";
import "./EditBoardForm.scss";
import { Formik, Form, FormikHelpers } from "formik";
import { ColorSelector, CustomField } from "..";
import colors from "../../service/colors";
import boardApi from "../../api/boardApi";
import { setBoard } from "../../redux/features/boardSlice";
import IBoard from "../../types/board";
import { useAppDispatch } from "../../redux/hooks";
import { useAlert } from "../../hooks/alert.hook";
import { useServerError } from "../../hooks/serverError.hook";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [acitveColor, setActiveColor] = useState<number>(0);
  const { setAlertState } = useAlert();
  const { handleServerError } = useServerError();

  const editBoard = async (boardData: IBoard) => {
    if (!board) return;
    setLoading(true);
    try {
      if (board.id) {
        const { message } = (await boardApi.update(board.id, boardData)).data;
        const { board: updatedBoard } = (await boardApi.getOne(board.id)).data;
        dispatch(setBoard(updatedBoard));
        setAlertState(message, "success");
      }
    } catch (error) {
      setAlertState(handleServerError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (
    values: IFormValues,
    { resetForm }: FormikHelpers<IFormValues>,
  ) => {
    const boardData: IBoard = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[acitveColor],
      },
    };

    editBoard(boardData);
    resetForm();
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
        <Formik
          initialValues={{
            name: board.name,
            description: board.description,
          }}
          onSubmit={submitForm}
        >
          {() => (
            <Form className="custom-form__container">
              <CustomField name="name" label="Name" type="text" />
              <CustomField name="description" label="Description" type="text" />
              <ColorSelector
                activeColor={acitveColor}
                setActiveColor={setActiveColor}
                colors={colors}
              />
              <div className="custom-form__control">
                <button
                  className="btn btn-blue"
                  type="submit"
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  );
}

export default EditBoardForm;
