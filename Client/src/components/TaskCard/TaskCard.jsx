import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { ConfirmForm, Modal } from "../../components";
import taskApi from "../../api/taskApi";
import "./TaskCard.scss";

function TaskCard({
  task,
  list,
  onDragOverHandler,
  onDragLeaveHandler,
  onDragStartHandler,
  onDragEndHandler,
  onDropHandler,
}) {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalActive(true);
  };

  const deleteTask = async () => {
    await taskApi.delete(task._id);
  };

  const editTask = async () => {
    await taskApi.update(task._id);
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
    <div
      draggable={true}
      onDragOver={(e) => onDragOverHandler(e)}
      onDragLeave={(e) => onDragLeaveHandler(e)}
      onDragStart={(e) => onDragStartHandler(e, list, task)}
      onDragEnd={(e) => onDragEndHandler(e)}
      onDrop={(e) => onDropHandler(e, list, task)}
      className="task"
    >
      <Modal active={isDeleteModalActive} setActive={setIsDeleteModalActive}>
        <ConfirmForm
          text={"Do you want to delete this task?"}
          confirmHandler={deleteTask}
          setActive={setIsDeleteModalActive}
        />
      </Modal>
      <div className="task__top">
        <span className="task-text">{task && task.text}</span>
        <DropdownMenu options={options} />
      </div>
    </div>
  );
}

export default TaskCard;
