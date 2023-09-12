import React from "react";
import "./AddNewTaskForm.scss";
import { Formik, Form } from "formik";
import { CustomField, TagsList } from "../../components";
import { setBoard } from "../../redux/features/boardSlice";
import { useState } from "react";
import taskApi from "../../api/taskApi";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

function AddNewTaskForm({ setActiveModal, section }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const board = useSelector((state) => state.board.value);

    const newTaskSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Title is too short")
            .max(64, "Title is too long")
            .required("Title is required"),
        description: Yup.string()
            .min(3, "Description is too short")
            .max(1024, "Description is too long")
            .required("Description is required"),
    });

    const addTask = (task) => {
        let sections = JSON.parse(JSON.stringify(board.sections));
        const currentSection = sections.find(
            (sectionElem) => sectionElem._id === section._id
        );
        currentSection.tasks = [...currentSection.tasks, task];
        dispatch(setBoard({ ...board, sections: sections }));
    };

    const createTask = async (values) => {
        let taskData = {
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            sectionId: section._id,
            tags: tags,
        };
        setLoading(true);
        try {
            const response = await taskApi.create(taskData);
            addTask(response.task);
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
                    title: "",
                    description: "",
                    deadline: Date.now(),
                }}
                validationSchema={newTaskSchema}
                onSubmit={async (values, { resetForm }) => {
                    await createTask(values);
                    resetForm();
                    setTags([]);
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
