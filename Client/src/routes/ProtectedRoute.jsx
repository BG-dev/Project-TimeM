import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn === true ? <Outlet /> : <Navigate to="/login" replace />;
}
