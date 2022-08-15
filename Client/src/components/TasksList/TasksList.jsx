import React from "react";
import NewTaskCard from "../NewTaskCard";
import TaskCard from "../TaskCard";
import "./TasksList.scss";

function TasksList({ status, tasks, setModalActive, setNewTaskStatus }) {
  return (
    <div className="tasks">
      <span className="tasks-list__title">{status}</span>
      <ul className="tasks-list">
        {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
        {
          <NewTaskCard
            setModalActive={setModalActive}
            setNewTaskStatus={setNewTaskStatus}
            status={status}
          />
        }
      </ul>
    </div>
  );
}

export default TasksList;
