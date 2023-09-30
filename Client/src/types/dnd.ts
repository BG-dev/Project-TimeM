import ISection from "./section";
import ITask from "./task";

export default interface IDragAndDropMethods {
    onDragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragStartHandler: (
        e: React.DragEvent<HTMLDivElement>,
        section: ISection,
        task: ITask
    ) => void;
    onDropHandler: (
        e: React.DragEvent<HTMLDivElement>,
        destinationSection: ISection,
        destinationTask: ITask
    ) => void;
    onDropTaskHandler: (
        e: React.DragEvent<HTMLDivElement>,
        destinationSection: ISection
    ) => void;
}
