import React from "react";
import "./NewTaskCard.scss";

function NewTaskCard({ setModalActive, setNewTaskSection, section }) {
    return (
        <div
            className="new-task-card"
            onClick={() => {
                setModalActive(true);
                setNewTaskSection(section);
            }}
        >
            <div className="wrapper">
                <i className="bx bx-plus-circle icon"></i>
                <span className="text">Add Task</span>
            </div>
        </div>
    );
}

export default NewTaskCard;
