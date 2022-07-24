import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage, ErrorPage, ProfilePage, HomePage, MyBoards } from "../pages";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/boards" element={<MyBoards />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
