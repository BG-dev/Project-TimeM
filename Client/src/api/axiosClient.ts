import axios from "axios";
import queryString from "query-string";

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
    },
    paramsSerializer: (params) => queryString.stringify({ params }),
});

export default axiosClient;
