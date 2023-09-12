import axiosClient from "./axiosClient";

const BASE_URL = "/api/auth";

const authApi = {
    login: (data) => axiosClient.post(`${BASE_URL}/login`, data),
    signup: (data) => axiosClient.post(`${BASE_URL}/register`, data),
    verify: () => axiosClient.get(`${BASE_URL}/isAuthUser`),
};

export default authApi;
