import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/auth.hook";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components";

export default function AppLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      const isAuth = await useAuth();

      if (!isAuth) navigate("/login");
      else setLoading(false);
    }
    verify();
  }, [navigate]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
