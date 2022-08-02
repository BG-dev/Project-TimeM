import React from "react";
import "./AddNewBoardForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

function AddNewBoardForm() {
  const [loading, setLoading] = useState(false);

  const addBoardHandler = async (values) => {
    try {
      const newBoardData = {
        username: values.username.toLowerCase(),
        email: values.email.toLowerCase(),
        password: values.password,
      };
      await axios.post("/api/auth/register", newBoardData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="form__title">Create new board</h2>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={async (values) => {
          await addBoardHandler(values);
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
            <div className="add-board-container">
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
            <div className="add-board-control">
              <button className="btn" type="submit" disabled={loading}>
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddNewBoardForm;
