import axiosClient from "./axiosClient";

const sectionApi = {
    // getOne: (id) => axiosClient.get(`/sections/board/${id}`),
    // getUserBoards: () => axiosClient.get(`/boards/userboards`),
    create: (data) => axiosClient.post("/sections", data),
    // update: (id, data) => axiosClient.put(`boards/${id}`, data),
    // delete: (id) => axiosClient.delete(`boards/${id}`),
};

export default sectionApi;
