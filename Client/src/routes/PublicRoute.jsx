import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn === false ? <Outlet /> : <Navigate to="/" replace />;
}
