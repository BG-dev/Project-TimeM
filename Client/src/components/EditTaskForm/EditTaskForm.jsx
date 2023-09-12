import React, { useEffect, useState } from "react";
import "./EditTaskForm.scss";
import { Formik, Form } from "formik";
import { CustomField } from "..";
import taskApi from "../../api/taskApi";
import * as Yup from "yup";
import { TagsList } from "..";
import { setBoard } from "../../redux/features/boardSlice";
import { useDispatch, useSelector } from "react-redux";

function EditTaskForm({ setActiveModal, task, section }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.value);
    const [tags, setTags] = useState([]);
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

    useEffect(() => {
        setTags(task.tags);
    }, [task]);

    const updateTask = (newTask) => {
        const updatedSections = JSON.parse(JSON.stringify(board.sections));
        const sectionIndex = updatedSections.findIndex(
            (sectionElem) => sectionElem._id === section._id
        );
        const taskIndex = updatedSections[sectionIndex].tasks.findIndex(
            (taskElem) => taskElem._id === task._id
        );
        updatedSections[sectionIndex].tasks.splice(taskIndex, 1);
        updatedSections[sectionIndex].tasks.splice(taskIndex, 0, newTask);
        dispatch(setBoard({ ...board, sections: [...updatedSections] }));
    };

    const editTask = async (values) => {
        let taskData = {
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            tags: tags,
        };
        setLoading(true);
        try {
            await taskApi.update(task._id, taskData);
            const response = await taskApi.getOne(task._id);
            updateTask(response.task);
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
                    title: task.title,
                    description: task.description,
                    deadline: task.deadline,
                }}
                validationSchema={taskSchema}
                onSubmit={async (values, { resetForm }) => {
                    await editTask(values);
                    setActiveModal(false);
                }}
            >
                {() => (
                    <Form className="custom-form__container">
                        <CustomField name="title" label="Title" type="text" />
                        <CustomField
                            name="description"
                            label="Description"
                            type="text"
                        />
                        <CustomField
                            name="deadline"
                            label="Deadline"
                            type="date"
                        />
                        <TagsList tags={tags} setTags={setTags} />
                        <div className="custom-form__control">
                            <button
                                className="btn btn-blue"
                                type="submit"
                                disabled={loading}
                            >
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
