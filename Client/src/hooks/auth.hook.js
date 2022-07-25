import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

export const useAuth = () => {
  const { token } = useContext(AuthContext);

  return { isLoggedIn: !!token };
};
