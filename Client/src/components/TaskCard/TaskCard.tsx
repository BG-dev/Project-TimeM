import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Dropdown } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import ConfirmForm from '../ConfirmForm';
import Modal from '../Modal';
import TagsList from '../TagsList';
import EditTaskForm from '../EditTaskForm';
import taskApi from '../../api/taskApi';
import { setBoard } from '../../redux/features/boardSlice';
import ITask from '../../types/task';
import ISection from '../../types/section';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import IBoard from '../../types/board';
import IDragAndDropMethods from '../../types/dnd';
import useAlert from '../../hooks/alert.hook';
import useServerError from '../../hooks/serverError.hook';
import { monthDayDateFormat } from '../../utils/dateFormats';
import './TaskCard.scss';

interface TaskCardProps {
    task: ITask;
    section: ISection;
    dragAndDropMethods: IDragAndDropMethods;
}

function TaskCard({ task, section, dragAndDropMethods }: TaskCardProps) {
    const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
    const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const board: IBoard | null = useAppSelector((state) => state.board.value);
    const { setAlertState } = useAlert();
    const { handleServerError } = useServerError();

    const openDeleteModal = () => {
        setIsDeleteModalActive(true);
    };

    const deleteTask = async () => {
        if (!board) return;
        try {
            if (task.id) {
                const { message } = (await taskApi.delete(task.id)).data;
                const updatedSections = JSON.parse(JSON.stringify(board.sections));
                const sectionIndex = updatedSections.findIndex(
                    (sectionElem: ISection) => sectionElem.id === section.id,
                );
                const taskIndex = updatedSections[sectionIndex].tasks?.findIndex(
                    (taskElem: ITask) => taskElem.id === task.id,
                );
                updatedSections[sectionIndex].tasks.splice(taskIndex, 1);
                dispatch(setBoard({ ...board, sections: [...updatedSections] }));
                setAlertState(message, 'info');
            }
        } catch (error) {
            setAlertState(handleServerError(error), 'error');
        }
    };

    const editTask = async () => {
        setIsEditModalActive(true);
    };

    const items = [
        {
            label: 'Edit',
            key: '1',
            icon: <EditOutlined />,
            onClick: () => editTask(),
        },
        {
            label: 'Remove',
            key: '2',
            icon: <DeleteOutlined />,
            danger: true,
            onClick: () => openDeleteModal(),
        },
    ];

    return (
        board && (
            <>
                <Modal active={isDeleteModalActive} setActive={setIsDeleteModalActive}>
                    <ConfirmForm
                        text="Do you want to delete this task?"
                        confirmHandler={deleteTask}
                        setActive={setIsDeleteModalActive}
                    />
                </Modal>
                <Modal active={isEditModalActive} setActive={setIsEditModalActive}>
                    <EditTaskForm
                        setActiveModal={setIsEditModalActive}
                        section={section}
                        task={task}
                    />
                </Modal>

                {task && (
                    <div
                        draggable
                        onDragOver={(e) => dragAndDropMethods.onDragOverHandler(e)}
                        onDragLeave={() => dragAndDropMethods.onDragLeaveHandler()}
                        onDragStart={() => dragAndDropMethods.onDragStartHandler(section, task)}
                        onDragEnd={() => dragAndDropMethods.onDragEndHandler()}
                        onDrop={(e) => dragAndDropMethods.onDropHandler(e, section, task)}
                        className="task"
                    >
                        <div className="task__top">
                            <span className="task__title">{task.title}</span>
                            <Dropdown trigger={['click']} menu={{ items }}>
                                <Button type="text" icon={<EllipsisOutlined />} size="large" />
                            </Dropdown>
                        </div>
                        <div className="task__content">
                            <p className="task__description">{task.description}</p>
                            {task.deadline && (
                                <p className="task__deadline">
                                    {dayjs(task.deadline).format(monthDayDateFormat)}
                                </p>
                            )}
                            <TagsList tags={task.tags} isRead />
                        </div>
                    </div>
                )}
            </>
        )
    );
}

export default TaskCard;
