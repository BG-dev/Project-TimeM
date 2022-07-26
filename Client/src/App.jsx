import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { LoginForm, RegisterForm, Footer } from "./components";
import { ProtectedRoute, PublicRoute } from "./routes";
import { ProfilePage, HomePage, AuthPage } from "./pages";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Navbar />}
      <div className="container">
        <div className="content">
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
        <Footer />
      </div>
    </>
  );
}

export default App;
