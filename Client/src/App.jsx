import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { LoginForm, RegisterForm, Footer } from "./components";
import { ProtectedRoute, PublicRoute, ContainerRoute } from "./routes";
import {
  ProfilePage,
  HomePage,
  AuthPage,
  BoardsPage,
  TasksPage,
} from "./pages";

function App() {
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
