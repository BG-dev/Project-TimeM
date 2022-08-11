import React from "react";
import TaskCard from "../TaskCard";
import "./TasksList.scss";

function TasksList({ status, tasks }) {
  return (
    <div className="tasks">
      <span className="tasks-list__title">{status}</span>
      <ul className="tasks-list">
        {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
      </ul>
    </div>
  );
}

export default TasksList;
