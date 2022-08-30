import React, { useState } from "react";
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
  const [isActiveDropdownMenu, setIsActiveDropdownMenu] = useState(false);

  const deleteTask = async () => {
    await taskApi.delete(task._id);
  };

  const options = [
    {
      text: "Delete",
      action: deleteTask,
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
        <DropdownMenu
          active={isActiveDropdownMenu}
          setActive={setIsActiveDropdownMenu}
          options={options}
        />
      </div>
    </div>
  );
}

export default TaskCard;
