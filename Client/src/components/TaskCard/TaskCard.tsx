import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { ConfirmForm, EditTaskForm, Modal, TagsList } from "..";
import taskApi from "../../api/taskApi";
import "./TaskCard.scss";
import { setBoard } from "../../redux/features/boardSlice";
import ITask from "../../types/task";
import ISection from "../../types/section";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import IBoard from "../../types/board";
import IDragAndDropMethods from "../../types/dnd";

interface ITaskCardProps {
    task: ITask;
    section: ISection;
    dragAndDropMethods: IDragAndDropMethods;
}

function TaskCard({ task, section, dragAndDropMethods }: ITaskCardProps) {
    const [isDeleteModalActive, setIsDeleteModalActive] =
        useState<boolean>(false);
    const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const board: IBoard | null = useAppSelector((state) => state.board.value);

    const openDeleteModal = () => {
        setIsDeleteModalActive(true);
    };

    const deleteTask = async () => {
        if (!board) return;
        try {
            if (task.id) {
                await taskApi.delete(task.id);
                const updatedSections = JSON.parse(
                    JSON.stringify(board.sections)
                );
                const sectionIndex = updatedSections.findIndex(
                    (sectionElem: ISection) => sectionElem.id === section.id
                );
                const taskIndex = updatedSections[
                    sectionIndex
                ].tasks?.findIndex(
                    (taskElem: ITask) => taskElem.id === task.id
                );
                updatedSections[sectionIndex].tasks.splice(taskIndex, 1);
                dispatch(
                    setBoard({ ...board, sections: [...updatedSections] })
                );
            }
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
        board && (
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
                <Modal
                    active={isEditModalActive}
                    setActive={setIsEditModalActive}
                >
                    <EditTaskForm
                        setActiveModal={setIsEditModalActive}
                        section={section}
                        task={task}
                    />
                </Modal>

                {task && (
                    <div
                        draggable={true}
                        onDragOver={(e) =>
                            dragAndDropMethods.onDragOverHandler(e)
                        }
                        onDragLeave={(e) =>
                            dragAndDropMethods.onDragLeaveHandler(e)
                        }
                        onDragStart={(e) =>
                            dragAndDropMethods.onDragStartHandler(
                                e,
                                section,
                                task
                            )
                        }
                        onDragEnd={(e) =>
                            dragAndDropMethods.onDragEndHandler(e)
                        }
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
                            <p className="task__id">{task.id}</p>
                            <p className="task__description">
                                {task.description}
                            </p>
                            <p className="task__deadline">{task.deadline}</p>
                            <TagsList tags={task.tags} isRead />
                        </div>
                    </div>
                )}
            </>
        )
    );
}

export default TaskCard;
