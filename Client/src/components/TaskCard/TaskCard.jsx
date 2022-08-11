import React from "react";
import "./TaskCard.scss";

function TaskCard({ task }) {
  return (
    <div className="task">
      <span className="task-text">{task && task.text}</span>
    </div>
  );
}

export default TaskCard;
