import IBoard from '../types/board';
import axiosClient from './axiosClient';

interface IGetOneResponse {
    board: IBoard;
}

interface IGetUserBoardsResponse {
    boards: IBoard[];
}

interface ICreateResponse {
    board: IBoard;
    message: string;
}

interface IUpdateResponse {
    board: IBoard;
    message: string;
}

interface IDeleteResponse {
    message: string;
}

const boardApi = {
    getOne: (id: string) => axiosClient.get<IGetOneResponse>(`/boards/board/${id}`),
    getUserBoards: () => axiosClient.get<IGetUserBoardsResponse>('/boards/userboards'),
    create: (data: IBoard) => axiosClient.post<ICreateResponse>('/boards', data),
    update: (id: string, data: IBoard) => axiosClient.put<IUpdateResponse>(`boards/${id}`, data),
    delete: (id: string) => axiosClient.delete<IDeleteResponse>(`boards/${id}`),
};

export default boardApi;
