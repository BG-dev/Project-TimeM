import ISection from "./section";

export default interface IBoard {
    id?: string;
    name: string;
    description: string;
    authorName?: string;
    color: {
        name: string;
        value: string;
    };
    sections?: ISection[];
    users?: string[];
    createdAt?: string;
}
