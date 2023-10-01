import React from "react";
import NewTaskCard from "../NewTaskCard";
import TaskCard from "../TaskCard";
import "./Section.scss";
import ISection from "../../types/section";
import IDragAndDropMethods from "../../types/dnd";

interface ISectionProps {
  section: ISection;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTaskSection: React.Dispatch<React.SetStateAction<ISection | null>>;
  dragAndDropMethods: IDragAndDropMethods;
}

function Section({
  section,
  setModalActive,
  setNewTaskSection,
  dragAndDropMethods,
}: ISectionProps) {
  return (
    section && (
      <div
        onDragOver={(e) => dragAndDropMethods.onDragOverHandler(e)}
        onDrop={(e) => dragAndDropMethods.onDropTaskHandler(e, section)}
        className="tasks"
      >
        <div className="tasks-list__top">
          <span className="tasks-list__title">{section.status}</span>
        </div>
        <ul className="tasks-list">
          {section.tasks &&
            section.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                section={section}
                dragAndDropMethods={dragAndDropMethods}
              />
            ))}
          <NewTaskCard
            setNewTaskSection={setNewTaskSection}
            setModalActive={setModalActive}
            section={section}
          />
        </ul>
      </div>
    )
  );
}

export default Section;
