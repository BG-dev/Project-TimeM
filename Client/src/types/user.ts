export default interface IUser {
    id?: string;
    username: string;
    email?: string;
    password?: string;
    contacts?: string[];
    boards?: string[];
    avatar?: string;
    createdAt?: number;
    updatedAt?: number;
}
