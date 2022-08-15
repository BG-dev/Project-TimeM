import React from "react";
import "./AddNewTaskForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import taskApi from "../../api/taskApi";

function AddNewTaskForm({ setTasks, setActiveModal, status, boardId, tasks }) {
  const [loading, setLoading] = useState(false);

  const addTask = (task) => {
    let newTasks = [...tasks];
    newTasks.forEach((list) => {
      if (list.status === status) list.tasks.push(task);
    });
    setTasks(newTasks);
  };

  const createTask = async (values) => {
    const taskData = {
      text: values.text,
      status: status,
      board: boardId,
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
                className="add-task-error"
                component="span"
                name="text"
              />
            </div>
            <div className="add-task-control">
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

export default AddNewTaskForm;
