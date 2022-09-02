import React from "react";
import "./AddNewTaskForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import taskApi from "../../api/taskApi";

function AddNewTaskForm({ setActiveModal, status, boardId, lists }) {
  const [loading, setLoading] = useState(false);

  const addTask = (task) => {
    let newTasks = [...lists];
    newTasks.forEach((list) => {
      if (list.status === status) list.tasks.push(task);
    });
  };

  const createTask = async (values) => {
    const position = lists.find((list) => list.status === status).tasks.length;
    let taskData = {
      text: values.text,
      status: status,
      board: boardId,
      position: position,
    };
    setLoading(true);
    try {
      const response = await taskApi.create(taskData);
      const task = response.task;
      addTask(task);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Create new tasks</h2>
      <Formik
        initialValues={{
          text: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await createTask(values);
          resetForm();
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="add-task__form">
            <div className="add-task__form-container">
              <label htmlFor="text">Text</label>
              <Field type="text" id="text" name="text" placeholder="Text" />
              <ErrorMessage
                className="span-error"
                component="span"
                name="text"
              />
            </div>
            <div className="add-task__form-container">
              <label htmlFor="text">Deadline</label>
              <Field
                type="date"
                id="deadline"
                name="deadline"
                placeholder="deadline"
              />
              <ErrorMessage
                className="span-error"
                component="span"
                name="deadline"
              />
            </div>
            <div className="add-task-control">
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

export default AddNewTaskForm;
