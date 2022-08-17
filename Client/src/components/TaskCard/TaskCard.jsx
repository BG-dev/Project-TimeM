import React from "react";
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
      <span className="task-text">{task && task.text}</span>
    </div>
  );
}

export default TaskCard;
