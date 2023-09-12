import axiosClient from "./axiosClient";

const boardApi = {
    getOne: (id) => axiosClient.get(`/boards/board/${id}`),
    getUserBoards: () => axiosClient.get(`/boards/userboards`),
    create: (data) => axiosClient.post("/boards", data),
    update: (id, data) => axiosClient.put(`boards/${id}`, data),
    delete: (id) => axiosClient.delete(`boards/${id}`),
};

export default boardApi;
