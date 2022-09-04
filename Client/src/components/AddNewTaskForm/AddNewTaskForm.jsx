import React from "react";
import "./AddNewTaskForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomField } from "../../components";
import { useState } from "react";
import taskApi from "../../api/taskApi";
import * as Yup from "yup";

function AddNewTaskForm({ setActiveModal, status, boardId, lists }) {
  const [loading, setLoading] = useState(false);

  const newTaskSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short")
      .min(64, "Title is too long")
      .required("Title is required"),
    description: Yup.string()
      .min(3, "Description is too short")
      .min(1024, "Description is too long")
      .required("Description is required"),
  });

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
        validationSchema={newTaskSchema}
        onSubmit={async (values, { resetForm }) => {
          await createTask(values);
          resetForm();
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="add-task__form">
            <div className="add-task__form-container">
              <label htmlFor="text">Title</label>
              <Field
                type="title"
                id="title"
                name="title"
                component={CustomField}
                placeholder="Title"
              />
              <ErrorMessage
                className="span-error"
                component="span"
                name="title"
              />
            </div>
            <div className="add-task__form-container">
              <label htmlFor="text">Description</label>
              <Field
                type="description"
                id="description"
                name="description"
                component={CustomField}
                placeholder="Description"
              />
              <ErrorMessage
                className="span-error"
                component="span"
                name="description"
              />
            </div>
            <div className="add-task__form-container">
              <label htmlFor="text">Deadline</label>
              <Field
                type="date"
                id="deadline"
                name="deadline"
                component={CustomField}
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
