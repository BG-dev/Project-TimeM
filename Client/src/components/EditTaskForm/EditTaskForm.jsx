import React from "react";
import "./EditTaskForm.scss";
import { Formik, Form } from "formik";
import { CustomField } from "..";
import { useState } from "react";
import taskApi from "../../api/taskApi";
import * as Yup from "yup";

function EditTaskForm({ setActiveModal, status, boardId, lists }) {
  const [loading, setLoading] = useState(false);

  const taskSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(64, "Title is too long")
      .required("Title is required"),
    description: Yup.string()
      .min(3, "Description is too short")
      .max(1024, "Description is too long")
      .required("Description is required"),
  });

  const updateTask = (task) => {
    let newTasks = [...lists];
    newTasks.forEach((list) => {
      if (list.status === status) list.tasks.push(task);
    });
  };

  const editTask = async (values) => {
    let taskData = {
      title: values.title,
      description: values.description,
      deadline: values.deadline,
    };
    setLoading(true);
    try {
      const response = await taskApi.update(taskData);
      const task = response.task;
      updateTask(task);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Edit task</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          deadline: Date.now(),
        }}
        validationSchema={taskSchema}
        onSubmit={async (values, { resetForm }) => {
          await editTask(values);
          resetForm();
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="custom-form__container">
            <CustomField name="title" label="Title" type="text" />
            <CustomField name="description" label="Description" type="text" />
            <CustomField name="deadline" label="Deadline" type="date" />
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

export default EditTaskForm;
