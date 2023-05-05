import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components";
import { AuthLayout, AppLayout } from "./layouts";
import {
  ProfilePage,
  HomePage,
  BoardsPage,
  TasksPage,
  BoardPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<RegisterForm />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
