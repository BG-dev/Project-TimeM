import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn === true ? children : <Navigate to="/login" replace />;
}
