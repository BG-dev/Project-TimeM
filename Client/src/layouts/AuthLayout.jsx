import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/auth.hook";
import { Outlet, useNavigate } from "react-router-dom";

import "../scss/_auth.scss";
import { Loading } from "../components";

export default function AuthLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      const isAuth = await useAuth();

      if (!isAuth) setLoading(false);
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
      </div>
    </div>
  );
}
