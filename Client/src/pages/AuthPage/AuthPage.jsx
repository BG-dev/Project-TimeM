import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from "../../components";

import "./AuthPage.scss";

function AuthPage({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth">{children}</div>
    </div>
  );
}

export default AuthPage;
