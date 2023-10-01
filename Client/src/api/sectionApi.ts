import ISection from "../types/section";
import axiosClient from "./axiosClient";

interface IGetOneResponse {
  section: ISection;
}

interface ICreateResponse {
  section: ISection;
}

interface IUpdateResponse {
  section: ISection;
}

const sectionApi = {
  getOne: (id: string) => axiosClient.get<IGetOneResponse>(`/sections/${id}`),
  create: (data: ISection) =>
    axiosClient.post<ICreateResponse>("/sections", data),
  update: (id: string, data: ISection) =>
    axiosClient.put<IUpdateResponse>(`sections/${id}`, data),
  delete: (id: string) => axiosClient.delete(`sections/${id}`),
};

export default sectionApi;
