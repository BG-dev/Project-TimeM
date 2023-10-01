import React from "react";
import "./NewTaskCard.scss";
import ISection from "../../types/section";

interface INewsTaskCardProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTaskSection: React.Dispatch<React.SetStateAction<ISection | null>>;
  section: ISection;
}

function NewTaskCard({
  setModalActive,
  setNewTaskSection,
  section,
}: INewsTaskCardProps) {
  return (
    <div
      className="new-task-card"
      onClick={() => {
        setModalActive(true);
        setNewTaskSection(section);
      }}
    >
      <div className="wrapper">
        <i className="bx bx-plus-circle icon" />
        <span className="text">Add Task</span>
      </div>
    </div>
  );
}

export default NewTaskCard;
