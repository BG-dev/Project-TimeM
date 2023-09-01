import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { BoardContext, BoardContextActions } from "../../context/BoardContext";

function BoardPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditBoardModalActive, setIsEditBoardModalActive] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [newTaskStatus, setNewTaskStatus] = useState(null);
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const { dispatch, lists } = useContext(BoardContext);

    async function updateTaskPosition(data) {
        try {
            await taskApi.updatePosition(data);
        } catch (err) {
            console.log(err);
        }
    }

    function onDragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === "task")
            e.target.style.boxShadow = "0 2px 3px black";
    }

    function onDragLeaveHandler(e) {
        e.target.style.boxShadow = "none";
    }

    function onDragStartHandler(e, list, task) {
        setCurrentList(list);
        setCurrentTask(task);
    }

    function onDragEndHandler(e) {
        e.target.style.boxShadow = "none";
    }

    async function onDropHandler(e, list, task) {
        e.preventDefault();
        e.stopPropagation();
        let updatedLists = [...lists];
        const currentIndex = currentList.tasks.indexOf(currentTask);
        const dropIndex = list.tasks.indexOf(task);
        updatedLists
            .find((tasksList) => tasksList.status === currentList.status)
            .tasks.splice(currentIndex, 1);

        currentTask.status = list.status;
        setCurrentTask(currentTask);

        updatedLists
            .find((tasksList) => tasksList.status === list.status)
            .tasks.splice(dropIndex + 1, 0, currentTask);

        await updateTaskPosition({
            resourceTasks: currentList.tasks,
            destinationTasks: list.tasks,
            resourceStatus: currentList.status,
            destinationStatus: list.status,
        });
        dispatch(BoardContextActions.setLists(updatedLists));
    }

    async function onDropTaskHandler(e, list) {
        e.preventDefault();
        let updatedLists = [...lists];
        const currentIndex = currentList.tasks.indexOf(currentTask);
        updatedLists
            .find((tasksList) => tasksList.status === currentList.status)
            .tasks.splice(currentIndex, 1);

        currentTask.status = list.status;
        setCurrentTask(currentTask);

        updatedLists
            .find((tasksList) => tasksList.status === list.status)
            .tasks.push(currentTask);

        await updateTaskPosition({
            resourceTasks: currentList.tasks,
            destinationTasks: list.tasks,
            resourceStatus: currentList.status,
            destinationStatus: list.status,
        });
        dispatch(BoardContextActions.setLists(updatedLists));
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
                console.log(response.board);
                setBoard(response.board);
                dispatch(BoardContextActions.setLists(response.board.tasks));
                console.log(board);
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
                <EditBoardForm
                    setActiveModal={setIsEditBoardModalActive}
                    board={board}
                    setBoard={setBoard}
                    id={id}
                />
            </Modal>
            <Modal active={isModalActive} setActive={setIsModalActive}>
                <AddNewTaskForm
                    setActiveModal={setIsModalActive}
                    lists={lists}
                    status={newTaskStatus}
                    boardId={id}
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
                {lists &&
                    lists.map((tasksList, index) => (
                        <TasksList
                            key={`${index}-${tasksList.status}`}
                            list={tasksList}
                            tasks={tasksList.tasks}
                            setModalActive={setIsModalActive}
                            setNewTaskStatus={setNewTaskStatus}
                            onDragOverHandler={onDragOverHandler}
                            onDragLeaveHandler={onDragLeaveHandler}
                            onDragStartHandler={onDragStartHandler}
                            onDragEndHandler={onDragEndHandler}
                            onDropHandler={onDropHandler}
                            onDropTaskHandler={onDropTaskHandler}
                        />
                    ))}
            </div>
        </div>
    );
}

export default BoardPage;
