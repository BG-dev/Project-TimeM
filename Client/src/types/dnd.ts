import ISection from "./section";
import ITask from "./task";

export default interface IDragAndDropMethods {
  onDragEndHandler: () => void;
  onDragLeaveHandler: () => void;
  onDragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStartHandler: (section: ISection, task: ITask) => void;
  onDropHandler: (
    e: React.DragEvent<HTMLDivElement>,
    destinationSection: ISection,
    destinationTask: ITask,
  ) => void;
  onDropTaskHandler: (
    e: React.DragEvent<HTMLDivElement>,
    destinationSection: ISection,
  ) => void;
}
