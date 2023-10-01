import React, { useState } from "react";
import "./AddNewBoardForm.scss";
import { Formik, Form, FormikHelpers } from "formik";
import { CustomField, ColorSelector } from "..";
import colors from "../../service/colors";
import boardApi from "../../api/boardApi";
import IBoard from "../../types/board";

interface IAddNewBoardFormProps {
  setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormValues {
  name: string;
  description: string;
}

const formInitialValues = {
  name: "",
  description: "",
};

function AddNewBoardForm({ setBoards, setActiveModal }: IAddNewBoardFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [acitveColor, setActiveColor] = useState<number>(0);

  const createBoard = async (boardData: IBoard) => {
    try {
      if (!boardData) throw new Error("Error board creation");
      setLoading(true);
      const response = await boardApi.create(boardData);
      const { board } = response.data;
      setBoards((prev) => [...prev, board]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (
    values: IFormValues,
    { resetForm }: FormikHelpers<IFormValues>,
  ) => {
    const newBoardData = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[acitveColor],
      },
    };

    createBoard(newBoardData);
    resetForm();
    setActiveModal(false);
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Create new board</h2>
      <Formik initialValues={formInitialValues} onSubmit={submitForm}>
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
              <button className="btn btn-blue" type="submit" disabled={loading}>
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddNewBoardForm;
