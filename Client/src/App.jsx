import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { useRequest } from "./hooks/request.hook";
import { Navbar } from "./components";
import { AuthContext } from "./context/AuthContext";
import { LoginForm, RegisterForm } from "./components";
import { ProtectedRoute, PublicRoute, ContainerRoute } from "./routes";
import {
  ProfilePage,
  HomePage,
  AuthPage,
  BoardsPage,
  TasksPage,
  BoardPage,
} from "./pages";
import { useEffect } from "react";

function App() {
  const { dispatch } = useContext(AuthContext);
  const { data, request } = useRequest();

  useEffect(() => {
    request("get", "/api/auth/isAuthUser");
  }, []);

  useEffect(() => {
    if (data.isLoggedIn === false) dispatch({ type: "LOGOUT" });
  }, [data]);
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route element={<ContainerRoute />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={
              <AuthPage>
                <LoginForm />
              </AuthPage>
            }
          />
          <Route
            path="/register"
            element={
              <AuthPage>
                <RegisterForm />
              </AuthPage>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
