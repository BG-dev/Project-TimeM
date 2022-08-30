import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
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
  const deleteTask = async () => {
    await taskApi.delete(task._id);
  };

  const options = [
    {
      text: "Edit",
      action: deleteTask,
      icon: "bx-edit",
    },
    {
      text: "Remove",
      action: deleteTask,
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
      <div className="task__top">
        <span className="task-text">{task && task.text}</span>
        <DropdownMenu options={options} />
      </div>
    </div>
  );
}

export default TaskCard;
