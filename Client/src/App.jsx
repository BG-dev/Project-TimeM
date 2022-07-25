import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { LoginForm, RegisterForm } from "./components";
import { ProtectedRoute, PublicRoute } from "./routes";
import { ProfilePage, HomePage, AuthPage } from "./pages";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="container">
      {isLoggedIn && <Navbar />}
      <Routes>
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
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
