import React from 'react';
import NewTaskCard from '../NewTaskCard';
import TaskCard from '../TaskCard';
import ISection from '../../types/section';
import IDragAndDropMethods from '../../types/dnd';
import './Section.scss';

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
                className="section"
            >
                <div className="section__header">
                    <span className="section__title">{section.status}</span>
                    <span className="section__tasks-count">
                        {section.tasks && section.tasks.length}
                    </span>
                </div>
                <ul className="section__tasks">
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
