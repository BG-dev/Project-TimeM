import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
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
import authApi from "./api/authApi";

function App() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    async function verify() {
      try {
        const response = await authApi.verify();
        if (!response.isLoggedIn) dispatch({ type: "LOGOUT" });
      } catch (error) {
        console.log(error);
      }
    }
    verify();
  }, []);

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
