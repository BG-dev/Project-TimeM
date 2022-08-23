import React from "react";
import NewTaskCard from "../NewTaskCard";
import TaskCard from "../TaskCard";
import "./TasksList.scss";

function TasksList({
  list,
  tasks,
  setModalActive,
  setNewTaskStatus,
  onDragOverHandler,
  onDragLeaveHandler,
  onDragStartHandler,
  onDragEndHandler,
  onDropHandler,
  onDropTaskHandler,
}) {
  return (
    <div
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => onDropTaskHandler(e, list)}
      className="tasks"
    >
      <div className="tasks-list__top">
        <span className="tasks-list__title">{list.status}</span>
      </div>
      <ul className="tasks-list">
        {tasks &&
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              list={list}
              onDragOverHandler={onDragOverHandler}
              onDragLeaveHandler={onDragLeaveHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onDropHandler={onDropHandler}
            />
          ))}
        {
          <NewTaskCard
            setModalActive={setModalActive}
            setNewTaskStatus={setNewTaskStatus}
            status={list.status}
          />
        }
      </ul>
    </div>
  );
}

export default TasksList;
