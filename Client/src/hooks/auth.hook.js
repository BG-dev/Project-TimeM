import authApi from "../api/authApi";

export const useAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await authApi.verify();
    return res.isLoggedIn;
  } catch {
    return false;
  }
};
