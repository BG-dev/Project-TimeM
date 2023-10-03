import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Alert from "antd/es/alert/Alert";
import { useAuth } from "../hooks/auth.hook";
import { Footer, Loading, Navbar } from "../components";
import { setUser } from "../redux/features/userSlice";
import { useAlert } from "../hooks/alert.hook";

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { text, type, visible } = useAlert();

  useEffect(() => {
    async function verify() {
      const response = await useAuth();
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
          {visible && (
            <Alert className="alert" message={text} type={type} showIcon />
          )}
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
