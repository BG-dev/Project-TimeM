import authApi from "../api/authApi";

export const useAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const response = await authApi.verify();
        return response.data;
    } catch {
        return false;
    }
};
