import React from "react";
import "./AddNewBoardForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useRequest from "../../hooks/request.hook";
import ColorSelector from "../ColorSelector";
import colors from "../../service/colors";
import { useState } from "react";

function AddNewBoardForm({ getBoardsRequest, setActiveModal }) {
  const { loading, request } = useRequest("post", "/boards");
  const [acitveColor, setActiveColor] = useState(0);

  const addBoardHandler = async (values) => {
    const boardData = {
      name: values.name,
      description: values.description,
      color: {
        ...colors[acitveColor],
      },
    };
    await request(boardData);
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
          await addBoardHandler(values);
          resetForm();
          setActiveModal(false);
          getBoardsRequest();
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
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
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
