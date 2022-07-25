import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { LoginForm, RegisterForm } from "./components";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProfilePage, HomePage } from "./pages";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="container">
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
