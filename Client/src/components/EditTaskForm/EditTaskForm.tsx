import React, { useEffect, useState } from "react";
import "./EditTaskForm.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomField, TagsList } from "..";
import taskApi from "../../api/taskApi";
import { setBoard } from "../../redux/features/boardSlice";
import ITask from "../../types/task";
import ISection from "../../types/section";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import IBoard from "../../types/board";
import ITag from "../../types/tag";

interface IEditTaskFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
  section: ISection;
}

interface IFormValues {
  title: string;
  description: string;
  deadline: number;
}

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

function EditTaskForm({ setActiveModal, task, section }: IEditTaskFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const board: IBoard | null = useAppSelector((state) => state.board.value);
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    setTags(task.tags);
  }, [task]);

  const updateTask = (newTask: ITask) => {
    if (!board) return;

    const updatedSections = JSON.parse(JSON.stringify(board.sections));
    const sectionIndex = updatedSections.findIndex(
      (sectionElem: ISection) => sectionElem.id === section.id,
    );
    const taskIndex = updatedSections[sectionIndex].tasks.findIndex(
      (taskElem: ITask) => taskElem.id === task.id,
    );
    updatedSections[sectionIndex].tasks.splice(taskIndex, 1);
    updatedSections[sectionIndex].tasks.splice(taskIndex, 0, newTask);
    dispatch(setBoard({ ...board, sections: [...updatedSections] }));
  };

  const editTask = async (taskData: ITask) => {
    setLoading(true);
    try {
      if (task.id) {
        await taskApi.update(task.id, taskData);
        const response = await taskApi.getOne(task.id);
        updateTask(response.data.task);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (values: IFormValues) => {
    const taskData: ITask = {
      title: values.title,
      description: values.description,
      deadline: values.deadline,
      tags,
    };

    editTask(taskData);
    setActiveModal(false);
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Edit task</h2>
      <Formik
        initialValues={{
          title: task.title,
          description: task.description,
          deadline: task.deadline,
        }}
        validationSchema={taskSchema}
        onSubmit={submitForm}
      >
        {() => (
          <Form className="custom-form__container">
            <CustomField name="title" label="Title" type="text" />
            <CustomField name="description" label="Description" type="text" />
            <CustomField name="deadline" label="Deadline" type="date" />
            <TagsList tags={tags} setTags={setTags} />
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