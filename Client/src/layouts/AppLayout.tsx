import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/auth.hook";
import { Footer, Loading, Navbar } from "../components";
import { setUser } from "../redux/features/userSlice";

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      const response = await useAuth();
      console.log("mem");
      if (!response || !response.isLoggedIn) navigate("/login");
      else {
        dispatch(setUser(response.user));
        setLoading(false);
      }
    }
    verify();
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
