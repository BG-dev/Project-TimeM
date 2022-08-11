import React from "react";
import { useState } from "react";
import "./TasksList.scss";

function TasksList({ status, tasks }) {
  return (
    <div className="tasks">
      <span className="tasks-list__title">{status}</span>
      <ul className="tasks-list">
        {tasks && tasks.map((task) => <p>{task.text}</p>)}
      </ul>
    </div>
  );
}

export default TasksList;
