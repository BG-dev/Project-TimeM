import React from "react";
import "./AddNewBoardForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ColorSelector from "../ColorSelector";
import colors from "../../service/colors";
import { useState } from "react";
import boardApi from "../../api/boardApi";

function AddNewBoardForm({ setBoards, setActiveModal }) {
  const [loading, setLoading] = useState(false);
  const [acitveColor, setActiveColor] = useState(0);

  const createBoard = async (values) => {
    const boardData = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[acitveColor],
      },
    };
    setLoading(true);
    try {
      const response = await boardApi.create(boardData);
      const board = response.board;
      setBoards((prev) => [...prev, board]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Create new board</h2>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await createBoard(values);
          resetForm();
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="add-board__form">
            <div className="add-board__form-container">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" placeholder="Name" />
              <ErrorMessage
                className="add-board__form-error"
                component="span"
                name="name"
              />
            </div>
            <div className="add-board__form-container">
              <label htmlFor="email">Description</label>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="Description"
              />
              <ErrorMessage
                className="add-board-error"
                component="span"
                name="description"
              />
            </div>
            <ColorSelector
              activeColor={acitveColor}
              setActiveColor={setActiveColor}
              colors={colors}
            />
            <div className="add-board-control">
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
