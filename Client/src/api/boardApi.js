import axiosClient from "./axiosClient";

const boardApi = {
  getOne: (id) => axiosClient.get(`/boards/getboard/${id}`),
  getAll: () => axiosClient.get(`/boards/getuserboards`),
  create: (data) => axiosClient.post("/boards", data),
  update: (id, data) => axiosClient.put(`boards/${id}`, data),
  delete: (id) => axiosClient.delete(`boards/${id}`),
};

export default boardApi;
