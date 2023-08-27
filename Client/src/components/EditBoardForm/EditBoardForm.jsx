import React, { useState } from "react";
import "./EditBoardForm.scss";
import { Formik, Form } from "formik";
import { ColorSelector, CustomField } from "..";
import colors from "../../service/colors";
import boardApi from "../../api/boardApi";

function EditBoardForm({ setActiveModal, board, setBoard, id }) {
  const [loading, setLoading] = useState(false);
  const [acitveColor, setActiveColor] = useState(0);

  const editBoard = async (values) => {
    const boardData = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[acitveColor],
      },
    };
    setLoading(true);
    try {
      const response = await boardApi.update(id, boardData);

      const board = response.updatedBoard;
      setBoard(board);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Edit board</h2>
      <Formik
        initialValues={{
          name: board.name,
          description: board.description,
        }}
        onSubmit={async (values, { resetForm }) => {
          await editBoard(values);
          resetForm();
          setActiveModal(false);
        }}
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
              <button className="btn btn-blue" type="submit" disabled={loading}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditBoardForm;
