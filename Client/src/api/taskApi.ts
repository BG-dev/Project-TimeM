import ISection from "../types/section";
import ITask from "../types/task";
import axiosClient from "./axiosClient";

interface IGetOneResponse {
  task: ITask;
}

interface ICreateResponse {
  task: ITask;
}

interface IUpdateResponse {
  task: ITask;
}

const taskApi = {
  getOne: (id: string) => axiosClient.get<IGetOneResponse>(`/tasks/${id}`),
  create: (data: ITask) => axiosClient.post<ICreateResponse>("/tasks", data),
  update: (id: string, data: ITask) =>
    axiosClient.put<IUpdateResponse>(`tasks/update/${id}`, data),
  updatePosition: (data: {
    resourceSection: ISection;
    destinationSection: ISection;
  }) => axiosClient.put<ITask>("tasks/updateposition", data),
  delete: (id: string) => axiosClient.delete(`tasks/${id}`),
};

export default taskApi;
