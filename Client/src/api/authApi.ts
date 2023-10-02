import IUser from "../types/user";
import axiosClient from "./axiosClient";

const BASE_URL = "/api/auth";

interface ILoginResponse {
  token: string;
  message: string;
}

interface IVerifyResponse {
  isLoggedIn: boolean;
  user: IUser;
}

interface ISignupResponse {
  message: string;
}

const authApi = {
  login: (data: IUser) =>
    axiosClient.post<ILoginResponse>(`${BASE_URL}/login`, data),
  signup: (data: IUser) =>
    axiosClient.post<ISignupResponse>(`${BASE_URL}/register`, data),
  verify: () => axiosClient.get<IVerifyResponse>(`${BASE_URL}/isAuthUser`),
};

export default authApi;
