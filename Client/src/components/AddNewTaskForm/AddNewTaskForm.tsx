import React from "react";
import "./AddNewTaskForm.scss";
import { Formik, Form, FormikHelpers } from "formik";
import { CustomField, TagsList } from "..";
import { setBoard } from "../../redux/features/boardSlice";
import { useState } from "react";
import taskApi from "../../api/taskApi";
import * as Yup from "yup";
import ISection from "../../types/section";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ITag from "../../types/tag";
import ITask from "../../types/task";
import IBoard from "../../types/board";

interface IAddNewTaskFormProps {
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
    section: ISection | null;
}

interface IFormValues {
    title: string;
    description: string;
    deadline: number;
}

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

function AddNewTaskForm({ setActiveModal, section }: IAddNewTaskFormProps) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<ITag[]>([]);
    const board: IBoard | null = useAppSelector((state) => state.board.value);

    const addTask = (task: ITask) => {
        if (board === null) return;

        let sections: ISection[] = JSON.parse(JSON.stringify(board.sections));
        let currentSection: ISection | undefined = sections.find(
            (sectionElem: ISection) => sectionElem.id === section?.id
        );

        if (currentSection && currentSection.tasks) {
            currentSection.tasks = [...currentSection.tasks, task];
            dispatch(setBoard({ ...board, sections: sections }));
        }
    };

    const createTask = async (taskData: ITask) => {
        setLoading(true);
        try {
            const response = await taskApi.create(taskData);
            const task: ITask = response.data.task;
            addTask(task);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const submitForm = (
        values: IFormValues,
        { resetForm }: FormikHelpers<IFormValues>
    ) => {
        let taskData: ITask = {
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            sectionId: section?.id,
            tags: tags,
        };
        createTask(taskData);
        resetForm();
        setTags([]);
        setActiveModal(false);
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
                onSubmit={submitForm}
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
