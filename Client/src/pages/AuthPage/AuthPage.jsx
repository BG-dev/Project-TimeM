import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from "../../components";

import "./AuthPage.scss";

function AuthPage() {
  return (
    <div className="auth-wrapper">
      <div className="auth">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default AuthPage;
