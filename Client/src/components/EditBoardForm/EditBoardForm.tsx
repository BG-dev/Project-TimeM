import React, { useEffect, useState } from "react";
import "./EditBoardForm.scss";
import { Formik, Form, FormikHelpers } from "formik";
import { ColorSelector, CustomField } from "..";
import colors from "../../service/colors";
import boardApi from "../../api/boardApi";
import { useDispatch } from "react-redux";
import { setBoard } from "../../redux/features/boardSlice";
import IBoard from "../../types/board";
import { useAppDispatch } from "../../redux/hooks";

interface IEditBoardFormProps {
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
    board: IBoard;
}

interface IFormValues {
    name: string;
    description: string;
}

function EditBoardForm({ setActiveModal, board }: IEditBoardFormProps) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [acitveColor, setActiveColor] = useState<number>(0);

    const editBoard = async (boardData: IBoard) => {
        if (!board) return;
        setLoading(true);
        try {
            if (board.id) {
                await boardApi.update(board.id, boardData);
                const response = await boardApi.getOne(board.id);
                dispatch(setBoard(response.data.board));
            }
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
        const boardData: IBoard = {
            name: values.name,
            description: values.description,
            color: {
                ...colors[acitveColor],
            },
        };

        editBoard(boardData);
        resetForm();
        setActiveModal(false);
    };

    useEffect(() => {
        setActiveColor(
            colors.findIndex((color) => color.value === board.color.value)
        );
    }, [board]);

    return (
        <div className="custom-form">
            <h2 className="custom-form__title">Edit board</h2>
            <Formik
                initialValues={{
                    name: board.name,
                    description: board.description,
                }}
                onSubmit={submitForm}
            >
                {() => (
                    <Form className="custom-form__container">
                        <CustomField name="name" label="Name" type="text" />
                        <CustomField
                            name="description"
                            label="Description"
                            type="text"
                        />
                        <ColorSelector
                            activeColor={acitveColor}
                            setActiveColor={setActiveColor}
                            colors={colors}
                        />
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

export default EditBoardForm;
