import React, { useState } from "react";
import "./AddNewTaskForm.scss";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { TagsList } from "..";
import { setBoard } from "../../redux/features/boardSlice";
import taskApi from "../../api/taskApi";
import ISection from "../../types/section";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ITag from "../../types/tag";
import ITask from "../../types/task";
import IBoard from "../../types/board";
import { useAlert } from "../../hooks/alert.hook";
import { useServerError } from "../../hooks/serverError.hook";
import {
  taskDescriptionValidation,
  taskTitleValidation,
} from "../../utils/validations";
import { fullDateFormat } from "../../utils/dateFormats";

interface IAddTaskFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  section: ISection | null;
}

interface IFormValues {
  title: string;
  description: string;
  deadline?: number;
}

function AddTaskForm({ setActiveModal, section }: IAddTaskFormProps) {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<ITag[]>([]);
  const board: IBoard | null = useAppSelector((state) => state.board.value);
  const { setAlertState } = useAlert();
  const { handleServerError } = useServerError();

  const addTask = (task: ITask) => {
    if (board === null) return;

    const sections: ISection[] = JSON.parse(JSON.stringify(board.sections));
    const currentSection: ISection | undefined = sections.find(
      (sectionElem: ISection) => sectionElem.id === section?.id,
    );

    if (currentSection && currentSection.tasks) {
      currentSection.tasks = [...currentSection.tasks, task];
      dispatch(setBoard({ ...board, sections }));
    }
  };

  const createTask = async (taskData: ITask) => {
    try {
      const response = await taskApi.create(taskData);
      const { task, message } = response.data;
      addTask(task);
      setAlertState(message, "success");
    } catch (error) {
      setAlertState(handleServerError(error), "error");
    }
  };

  const submitForm = (values: IFormValues) => {
    const taskData: ITask = {
      title: values.title,
      description: values.description,
      deadline: values.deadline,
      sectionId: section?.id,
      tags,
    };
    createTask(taskData);
    setTags([]);
    setActiveModal(false);
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Create new tasks</h2>
      <Form
        className="custom-form__container"
        layout="vertical"
        initialValues={{
          deadline: dayjs(),
        }}
        onFinish={submitForm}
      >
        <Form.Item<IFormValues>
          label="Title"
          name="title"
          validateFirst
          required={false}
          rules={taskTitleValidation}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item<IFormValues>
          label="Description"
          name="description"
          validateFirst
          required={false}
          rules={taskDescriptionValidation}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item<IFormValues>
          label="Deadline"
          name="deadline"
          validateFirst
          required={false}
        >
          <DatePicker format={fullDateFormat} />
        </Form.Item>
        <TagsList tags={tags} setTags={setTags} />
        <div className="custom-form__control">
          <Button htmlType="submit" type="primary" size="large">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddTaskForm;
