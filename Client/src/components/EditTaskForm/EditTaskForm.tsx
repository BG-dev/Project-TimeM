import React, { useEffect, useState } from 'react';
import './EditTaskForm.scss';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import taskApi from '../../api/taskApi';
import { setBoard } from '../../redux/features/boardSlice';
import ITask from '../../types/task';
import ISection from '../../types/section';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import IBoard from '../../types/board';
import ITag from '../../types/tag';
import useServerError from '../../hooks/serverError.hook';
import useAlert from '../../hooks/alert.hook';
import TagsList from '../TagsList';
import { taskDescriptionValidation, taskTitleValidation } from '../../utils/validations';
import { fullDateFormat } from '../../utils/dateFormats';

interface IEditTaskFormProps {
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
    task: ITask;
    section: ISection;
}

interface IFormValues {
    title: string;
    description: string;
    deadline?: number;
}

function EditTaskForm({ setActiveModal, task, section }: IEditTaskFormProps) {
    const dispatch = useAppDispatch();
    const board: IBoard | null = useAppSelector((state) => state.board.value);
    const [tags, setTags] = useState<ITag[]>([]);
    const { setAlertState } = useAlert();
    const { handleServerError } = useServerError();

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
        try {
            if (task.id) {
                const { message } = (await taskApi.update(task.id, taskData)).data;
                const { task: updatedTask } = (await taskApi.getOne(task.id)).data;
                updateTask(updatedTask);
                setAlertState(message, 'success');
            }
        } catch (error) {
            setAlertState(handleServerError(error), 'error');
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
            <Form
                className="custom-form__container"
                layout="vertical"
                initialValues={{
                    title: task.title,
                    description: task.description,
                    deadline: dayjs(task.deadline),
                }}
                onFinish={submitForm}>
                <Form.Item<IFormValues>
                    label="Title"
                    name="title"
                    validateFirst
                    required={false}
                    rules={taskTitleValidation}>
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item<IFormValues>
                    label="Description"
                    name="description"
                    validateFirst
                    required={false}
                    rules={taskDescriptionValidation}>
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item<IFormValues>
                    label="Deadline"
                    name="deadline"
                    validateFirst
                    required={false}>
                    <DatePicker format={fullDateFormat} />
                </Form.Item>
                <TagsList tags={tags} setTags={setTags} />
                <div className="custom-form__control">
                    <Button htmlType="submit" type="primary" size="large">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default EditTaskForm;
