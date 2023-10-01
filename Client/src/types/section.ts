import ITask from "./task";

export default interface ISection {
  id: string;
  status: string;
  position: number;
  boardId: string;
  tasks?: ITask[];
}
