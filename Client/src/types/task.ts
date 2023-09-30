import ITag from "./tag";

export default interface ITask {
    id?: string;
    title: string;
    description: string;
    deadline: number;
    tags: ITag[];
    position?: number;
    sectionId?: string;
}
