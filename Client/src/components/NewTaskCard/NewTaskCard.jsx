import React from "react";
import "./NewTaskCard.scss";

function NewTaskCard({ setModalActive, setNewTaskStatus, status }) {
  const openModal = () => {
    setModalActive(true);
    setNewTaskStatus(status);
  };

  return (
    <div className="new-task-card" onClick={() => openModal()}>
      <div className="wrapper">
        <i className="bx bx-plus-circle icon"></i>
        <span className="text">Add Task</span>
      </div>
    </div>
  );
}

export default NewTaskCard;
