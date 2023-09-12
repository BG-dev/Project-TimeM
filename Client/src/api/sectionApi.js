import axiosClient from "./axiosClient";

const sectionApi = {
    getOne: (id) => axiosClient.get(`/sections/${id}`),
    create: (data) => axiosClient.post("/sections", data),
    update: (id, data) => axiosClient.put(`sections/${id}`, data),
    delete: (id) => axiosClient.delete(`sections/${id}`),
};

export default sectionApi;
