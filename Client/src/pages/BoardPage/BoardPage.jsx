import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setBoard } from "../../redux/features/boardSlice";
import "./BoardPage.scss";
import {
    TasksList,
    Modal,
    AddNewTaskForm,
    ConfirmForm,
    EditBoardForm,
    Loading,
} from "../../components";
import boardApi from "../../api/boardApi";
import taskApi from "../../api/taskApi";
import { useDispatch, useSelector } from "react-redux";

function BoardPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.value);
    const [isEditBoardModalActive, setIsEditBoardModalActive] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [newTaskStatus, setNewTaskStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    const dragAndDropMethods = {
        onDragEndHandler,
        onDragLeaveHandler,
        onDragOverHandler,
        onDragStartHandler,
        onDropHandler,
        onDropTaskHandler,
    };

    async function updateTaskPosition(data) {
        try {
            await taskApi.updatePosition(data);
        } catch (err) {
            console.log(err);
        }
    }

    function onDragOverHandler(e) {
        e.preventDefault();
        // if (e.target.className === "task")
        //     e.target.style.boxShadow = "0 2px 3px black";
    }

    function onDragLeaveHandler(e) {
        // e.target.style.boxShadow = "none";
    }

    function onDragStartHandler(e, section, task) {
        setCurrentSection(section);
        setCurrentTask(task);
    }

    function onDragEndHandler(e) {
        // e.target.style.boxShadow = "none";
    }

    async function onDropHandler(e, destinationSection, destinationTask) {
        e.preventDefault();
        e.stopPropagation();
        let updatedSections = JSON.parse(JSON.stringify(board.sections));

        const currentSectionIndex = updatedSections.findIndex(
            (section) => section.status === currentSection.status
        );
        const destinationSectionIndex = updatedSections.findIndex(
            (section) => section.status === destinationSection.status
        );
        const currentTaskIndex = currentSection.tasks.indexOf(currentTask);
        const destinationTaskIndex =
            destinationSection.tasks.indexOf(destinationTask);
        updatedSections[currentSectionIndex].tasks.splice(currentTaskIndex, 1);
        const newTask = { ...currentTask, sectionId: destinationSection._id };
        updatedSections[destinationSectionIndex].tasks.splice(
            destinationTaskIndex + 1,
            0,
            newTask
        );

        await updateTaskPosition({
            resourceSection: updatedSections[currentSectionIndex],
            destinationSection: updatedSections[destinationSectionIndex],
        });
        const newBoard = {
            ...board,
            sections: updatedSections,
        };
        dispatch(setBoard(newBoard));
    }

    async function onDropTaskHandler(e, destinationSection) {
        e.preventDefault();
        let updatedSections = JSON.parse(JSON.stringify(board.sections));

        const currentSectionIndex = updatedSections.findIndex(
            (section) => section.status === currentSection.status
        );
        const destinationSectionIndex = updatedSections.findIndex(
            (section) => section.status === destinationSection.status
        );
        const currentTaskIndex = currentSection.tasks.indexOf(currentTask);
        updatedSections[currentSectionIndex].tasks.splice(currentTaskIndex, 1);
        const newTask = { ...currentTask, sectionId: destinationSection._id };
        updatedSections[destinationSectionIndex].tasks.push(newTask);

        await updateTaskPosition({
            resourceSection: updatedSections[currentSectionIndex],
            destinationSection: updatedSections[destinationSectionIndex],
        });
        const newBoard = {
            ...board,
            sections: updatedSections,
        };
        dispatch(setBoard(newBoard));
    }

    async function deleteBoard(event) {
        event.preventDefault();
        await boardApi.delete(id);
        setIsDeleteModalActive(false);
        navigate("/boards");
    }

    useEffect(() => {
        async function getBoard() {
            setLoading(true);
            try {
                const response = await boardApi.getOne(id);
                dispatch(setBoard(response.board));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getBoard();
    }, []);

    return !board ? (
        <Loading />
    ) : (
        <div className="board">
            <div className="board__top">
                <span className="board__title">{board && board.name}</span>
                <div className="board__menu">
                    <button
                        className="btn btn-blue"
                        onClick={() =>
                            setIsEditBoardModalActive((prev) => !prev)
                        }
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-red"
                        onClick={() => setIsDeleteModalActive((prev) => !prev)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <Modal
                active={isEditBoardModalActive}
                setActive={setIsEditBoardModalActive}
            >
                <EditBoardForm setActiveModal={setIsEditBoardModalActive} />
            </Modal>
            <Modal active={isModalActive} setActive={setIsModalActive}>
                <AddNewTaskForm
                    setActiveModal={setIsModalActive}
                    status={newTaskStatus}
                />
            </Modal>
            <Modal
                active={isDeleteModalActive}
                setActive={setIsDeleteModalActive}
            >
                <ConfirmForm
                    text={"Do you want to delete this board?"}
                    confirmHandler={deleteBoard}
                    setActive={setIsDeleteModalActive}
                />
            </Modal>
            <div className="lists">
                {board.sections &&
                    board.sections.map((section) => (
                        <TasksList
                            key={section._id}
                            section={section}
                            setModalActive={setIsModalActive}
                            setNewTaskStatus={setNewTaskStatus}
                            dragAndDropMethods={dragAndDropMethods}
                        />
                    ))}
            </div>
        </div>
    );
}

export default BoardPage;
