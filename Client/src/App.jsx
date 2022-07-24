import React, { useContext } from "react";
import { Navbar } from "./components";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./hooks/routes.hook";

function App() {
  const { token } = useContext(AuthContext);
  const isAuthenticated = token;
  const routes = useRoutes(isAuthenticated);

  return (
    <div className="container">
      {isAuthenticated && <Navbar />}
      {routes}
    </div>
  );
}

export default App;
