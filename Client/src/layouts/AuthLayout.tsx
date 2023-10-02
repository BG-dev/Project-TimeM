import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { useAuth } from "../hooks/auth.hook";
import { Loading } from "../components";

import "../scss/_auth.scss";
import { useAlert } from "../hooks/alert.hook";

export default function AuthLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { text, type, visible } = useAlert();

  useEffect(() => {
    async function verify() {
      const response = await useAuth();

      if (!response || !response.isLoggedIn) setLoading(false);
      else navigate("/");
    }
    verify();
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <div className="auth-wrapper">
      <div className="auth">
        <Outlet />
        {visible && (
          <Alert className="alert" message={text} type={type} showIcon />
        )}
      </div>
    </div>
  );
}
