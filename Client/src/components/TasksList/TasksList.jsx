import React from "react";
import NewTaskCard from "../NewTaskCard";
import TaskCard from "../TaskCard";
import "./TasksList.scss";

function TasksList({
    section,
    setModalActive,
    setNewTaskSection,
    dragAndDropMethods,
}) {
    return (
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
                            key={task._id}
                            task={task}
                            section={section}
                            dragAndDropMethods={dragAndDropMethods}
                        />
                    ))}
                {
                    <NewTaskCard
                        setNewTaskSection={setNewTaskSection}
                        setModalActive={setModalActive}
                        section={section}
                    />
                }
            </ul>
        </div>
    );
}

export default TasksList;
