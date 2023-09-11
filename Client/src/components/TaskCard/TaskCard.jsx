import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { ConfirmForm, EditTaskForm, Modal, TagsList } from "../../components";
import taskApi from "../../api/taskApi";
import "./TaskCard.scss";

function TaskCard({ task, section, dragAndDropMethods }) {
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [isEditModalActive, setIsEditModalActive] = useState(false);

    const openDeleteModal = () => {
        setIsDeleteModalActive(true);
    };

    const deleteTask = async () => {
        try {
            await taskApi.delete(task._id);
            const newLists = [...lists];
            const listIndex = newLists.findIndex(
                (elem) => elem.status === list.status
            );
            const taskIndex = newLists[listIndex].tasks.findIndex(
                (elem) => elem._id === task._id
            );
            newLists[listIndex].tasks.splice(taskIndex, 1);
            dispatch(BoardContextActions.setLists(newLists));
        } catch (error) {
            console.log(error);
        }
    };

    const editTask = async () => {
        setIsEditModalActive(true);
    };

    const options = [
        {
            text: "Edit",
            action: editTask,
            icon: "bx-edit",
        },
        {
            text: "Remove",
            action: openDeleteModal,
            icon: "bx-trash",
        },
    ];

    return (
        <>
            <Modal
                active={isDeleteModalActive}
                setActive={setIsDeleteModalActive}
            >
                <ConfirmForm
                    text={"Do you want to delete this task?"}
                    confirmHandler={deleteTask}
                    setActive={setIsDeleteModalActive}
                />
            </Modal>
            <Modal active={isEditModalActive} setActive={setIsEditModalActive}>
                <EditTaskForm
                    setActive={setIsEditModalActive}
                    section={section}
                    task={task}
                />
            </Modal>

            {task && (
                <div
                    draggable={true}
                    onDragOver={(e) => dragAndDropMethods.onDragOverHandler(e)}
                    onDragLeave={(e) =>
                        dragAndDropMethods.onDragLeaveHandler(e)
                    }
                    onDragStart={(e) =>
                        dragAndDropMethods.onDragStartHandler(e, section, task)
                    }
                    onDragEnd={(e) => dragAndDropMethods.onDragEndHandler(e)}
                    onDrop={(e) =>
                        dragAndDropMethods.onDropHandler(e, section, task)
                    }
                    className="task"
                >
                    <div className="task__top">
                        <span className="task__title">{task.title}</span>
                        <DropdownMenu options={options} />
                    </div>
                    <div className="task__content">
                        <p className="task__id">{task._id}</p>
                        <p className="task__description">{task.description}</p>
                        <p className="task__deadline">{task.deadline}</p>
                        <TagsList tags={task.tags} isRead />
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskCard;
